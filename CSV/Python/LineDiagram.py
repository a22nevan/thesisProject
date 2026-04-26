import pandas as pd
import matplotlib.pyplot as plt

fileSize = "xl"
operation = "get" #create or get
measure = "total" #total or crypt

if fileSize == "s" :
    title = "Small"
    
elif fileSize == "m":
    title = "Medium"
    
elif fileSize == "l":
    title = "Large"
    
elif fileSize == "xl":
    title = "Extra Large"

if operation == "create":
    opCrypt = "Encryption"
    opTitle = "Creating"

elif operation == "get":
    opCrypt = "Decryption"
    opTitle = "Retrieving"

cbcFile = f'CSV\Pilot Study\{operation}_{fileSize}_cbc_posts.csv'
gcmFile = f'CSV\Pilot Study\{operation}_{fileSize}_gcm_posts.csv'

cbcData = pd.read_csv(cbcFile, sep = ",", header = 0, names = ["Index", "Post Length", f'{opCrypt} Start', f'{opCrypt} End', f'{opCrypt} Delta', "Start Time", "End Time", "Process Delta"], engine = "python")
gcmData = pd.read_csv(gcmFile, sep = ",", header = 0, names = ["Index", "Post Length", f'{opCrypt} Start', f'{opCrypt} End', f'{opCrypt} Delta', "Start Time", "End Time", "Process Delta"], engine = "python")

cbcX = cbcData["Index"].tolist()
cbcprocY = (cbcData["Process Delta"] * 1000).tolist()
cbccryptY = (cbcData[f'{opCrypt} Delta'] * 1000).tolist()

gcmX = gcmData["Index"].tolist()
gcmprocY = (gcmData["Process Delta"] * 1000).tolist()
gcmcryptY = (gcmData[f'{opCrypt} Delta'] * 1000).tolist()

if measure == "total":
    plt.plot(cbcX, cbcprocY, label = "CBC Total Process", color = "red", alpha = 0.7);
    plt.plot(gcmX, gcmprocY, label = "GCM Total Process", color = "blue", alpha = 0.7);
    plt.title(f'Total Process Time for {opTitle} {title} Posts (CBC & GCM)')
    
elif measure == "crypt":
    plt.plot(cbcX, cbccryptY, label = f"CBC {opCrypt}", color = "red", alpha = 0.7);
    plt.plot(gcmX, gcmcryptY, label = f"GCM {opCrypt}", color = "blue", alpha = 0.7);
    plt.title(f'{opCrypt} Time for {title} Posts (CBC & GCM)')
    
plt.xlabel("Iteration")
plt.ylabel(f'{opCrypt} Time (ms)')
plt.legend()
plt.grid(True)

plt.show()
