import os
from azure.communication.networktraversal import CommunicationRelayClient
from azure.identity import DefaultAzureCredential
from azure.communication.identity import CommunicationIdentityClient

try:
    print("Azure Communication Services - Access Relay Configuration Quickstart")

    # Authentication setup
    connection_str = "endpoint=https://azureavatarcommsvs.unitedstates.communication.azure.com/;accesskey=VkPFqKJxByFA1t76K/dTOU3TnA4hjFr/TikQ/mDhCyokijf/z+6XlSJtop2byhIKqrM9JNV5XtKQnKOaMj55HQ=="
    endpoint = "https://azureavatarcommsvs.unitedstates.communication.azure.com"

    # Initialize the Communication Identity Client using the connection string
    identity_client = CommunicationIdentityClient.from_connection_string(connection_str)

    # Alternatively, you can use DefaultAzureCredential if your environment is set up for it
    # identity_client = CommunicationIdentityClient(endpoint, DefaultAzureCredential())

    # Creating a user
    user = identity_client.create_user()
    
    # Initialize the Communication Relay Client
    relay_client = CommunicationRelayClient.from_connection_string(connection_str)

    # Getting the relay configuration without passing the 'user'
    relay_configuration = relay_client.get_relay_configuration()

    # Processing ICE Server Information
    for iceServer in relay_configuration.ice_servers:
        if iceServer.username:
            print('Username: ' + iceServer.username)
        if iceServer.credential:
            print('Credential: ' + iceServer.credential)
        if iceServer.urls:
            for url in iceServer.urls:
                print('Url:' + url)

except Exception as ex:
    print("Exception:")
    print(ex)

