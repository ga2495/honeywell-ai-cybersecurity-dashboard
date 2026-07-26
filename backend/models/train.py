import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import TensorDataset, DataLoader, random_split, WeightedRandomSampler
from sklearn.preprocessing import LabelEncoder
import joblib

from transformer import BehavioralTransformer

BATCH_SIZE = 256
EPOCHS = 15
LEARNING_RATE = 0.001

print("Loading sequences...")

X = np.load("backend/data/processed/X_sequences.npy")
y = np.load("backend/data/processed/y_sequences.npy")

print("Encoding labels...")

encoder = LabelEncoder()
y = encoder.fit_transform(y)

joblib.dump(
    encoder,
    "backend/data/models/label_encoder.pkl"
)

X = torch.tensor(X, dtype=torch.float32)
y = torch.tensor(y, dtype=torch.long)

dataset = TensorDataset(X, y)

train_size = int(0.8 * len(dataset))
test_size = len(dataset) - train_size

train_dataset, test_dataset = random_split(
    dataset,
    [train_size, test_size]
)

train_labels = y[train_dataset.indices]

class_counts = torch.bincount(train_labels)
class_weights = 1.0 / class_counts.float()

sample_weights = class_weights[train_labels]

sampler = WeightedRandomSampler(
    sample_weights,
    len(sample_weights),
    replacement=True
)

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    sampler=sampler
)

test_loader = DataLoader(
    test_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("Using device:", device)

model = BehavioralTransformer(
    input_dim=X.shape[2]
).to(device)

criterion = nn.CrossEntropyLoss()

optimizer = torch.optim.Adam(
    model.parameters(),
    lr=LEARNING_RATE
)

for epoch in range(EPOCHS):

    model.train()

    running_loss = 0

    correct = 0
    total = 0

    for batch_x, batch_y in train_loader:

        batch_x = batch_x.to(device)
        batch_y = batch_y.to(device)

        optimizer.zero_grad()

        outputs = model(batch_x)

        loss = criterion(outputs, batch_y)

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

        preds = outputs.argmax(dim=1)

        correct += (preds == batch_y).sum().item()
        total += batch_y.size(0)

    print(
        f"Epoch {epoch+1}/{EPOCHS} "
        f"Loss={running_loss/len(train_loader):.4f} "
        f"Accuracy={100*correct/total:.2f}%"
    )

torch.save(
    model.state_dict(),
    "backend/data/models/transformer.pth"
)

print("\nTraining Complete!")
print("Model saved successfully.")