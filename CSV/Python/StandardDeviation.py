import pandas as pd
import matplotlib.pyplot as plt

fileSize = "xl"
operation = "create" #create or get

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

cbcDf = pd.read_csv(cbcFile, sep = ",", header = 0, names = ["Index", "Post Length", f'{opCrypt} Start', f'{opCrypt} End', f'{opCrypt} Delta', "Start Time", "End Time", "Process Delta"], engine = "python")
gcmDf = pd.read_csv(gcmFile, sep = ",", header = 0, names = ["Index", "Post Length", f'{opCrypt} Start', f'{opCrypt} End', f'{opCrypt} Delta', "Start Time", "End Time", "Process Delta"], engine = "python")

barWidth = 0.4
opacity = 0.6

positions = [0, 1, 2, 3]

cbcData = (cbcDf[f'{opCrypt} Delta'] * 1000).mean()
cbcData2 = (cbcDf["Process Delta"] * 1000).mean()

cbcBars = (cbcDf[f'{opCrypt} Delta'] * 1000).std()
cbcBars2 = (cbcDf["Process Delta"] * 1000).std()
color1 = "red"

gcmData = (gcmDf[f'{opCrypt} Delta'] * 1000).mean()
gcmData2 = (gcmDf["Process Delta"] * 1000).mean()

gcmBars = (gcmDf[f'{opCrypt} Delta'] * 1000).std()
gcmBars2 = (gcmDf["Process Delta"] * 1000).std()
color2 = "blue"

plt.bar(positions[0], cbcData, color = color1, edgecolor = "black", width = barWidth, yerr = cbcBars, capsize = 7, alpha = opacity, zorder = 2)
plt.bar(positions[1], cbcData2, color = color1, edgecolor = "black", width = barWidth, yerr = cbcBars2, capsize = 7, alpha = opacity, zorder = 2)

plt.bar(positions[2], gcmData, color = color2, edgecolor = "black", width = barWidth, yerr = gcmBars, capsize = 7, alpha = opacity, zorder = 2)
plt.bar(positions[3], gcmData2, color = color2, edgecolor = "black", width = barWidth, yerr = gcmBars2, capsize = 7, alpha = opacity, zorder = 2)

plt.xticks(positions, [f'CBC {opCrypt}', f'CBC Total', f'GCM {opCrypt}', f'GCM Total'])

plt.ylabel(f'{opCrypt} Time (ms)')
plt.title(f'{title} File {opCrypt} Time Means Deviation Comparison')
plt.grid(axis = "y", linestyle = "--", alpha = 0.7, zorder = 0)
plt.show()
