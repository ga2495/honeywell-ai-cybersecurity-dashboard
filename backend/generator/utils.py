import random
from faker import Faker

fake = Faker()

CITIES = [
    "Bangalore",
    "Delhi",
    "Mumbai",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad"
]

AUTH_METHODS = [
    "Password",
    "Token",
    "Certificate",
    "Biometric"
]

RESOURCES = [
    "HR_Portal",
    "Finance_DB",
    "Email_Server",
    "Source_Code",
    "CRM",
    "Cloud_Storage",
    "SCADA",
    "IoT_Gateway",
    "Admin_Panel",
    "VPN"
]

DEVICE_TYPES = [
    "Windows11",
    "Ubuntu22",
    "MacOS14",
    "Android13",
    "Firmware2.1"
]

COMMAND_SEQUENCES = [
    "login->view->logout",
    "login->edit->save->logout",
    "login->download->logout",
    "login->query->logout",
    "login->upload->logout"
]


def random_ip():
    return fake.ipv4()


def random_mac():
    return fake.mac_address()


def random_city():
    return random.choice(CITIES)


def random_resource():
    return random.choice(RESOURCES)


def random_auth():
    return random.choice(AUTH_METHODS)


def random_device():
    return random.choice(DEVICE_TYPES)


def random_command():
    return random.choice(COMMAND_SEQUENCES)