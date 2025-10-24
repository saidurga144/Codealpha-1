# **App Name**: Packet Detective

## Core Features:

- Live Packet Capture: Capture network packets from a specified interface.
- Packet Summary Display: Display packet summaries, including timestamp, source/destination IPs and ports, protocol, and length, in a CLI.
- BPF Filtering: Filter captured packets based on a BPF filter string provided via the CLI.
- Payload Preview: Display a truncated preview of the packet payload (first 128 bytes) in both hex and ASCII formats.
- Protocol Identification: Identify common protocols (e.g., HTTP, DNS) and display protocol names instead of layer numbers.
- PCAP Saving: Save captured packets to a PCAP file for later analysis.
- Automated Threat Detector: AI-powered tool for analyzing network traffic and predicting anomalies. The AI decides which types of network scans are associated with which class of vulnerability and displays its best judgement in an automated format to the user.

## Style Guidelines:

- Primary color: A saturated blue (#4285F4) evoking the technical and analytical aspects of network monitoring.
- Background color: A light, desaturated blue (#E3F2FD) providing a calm backdrop for data display.
- Accent color: A vibrant purple (#9C27B0), placed 30 degrees to the left of the primary, used to highlight key information.
- Body and headline font: 'Inter', a sans-serif font for clear, readable data presentation.
- Code font: 'Source Code Pro' for payload and other code snippets.
- Use simple, clear icons to represent different protocols (e.g., HTTP, DNS, TCP) for quick visual identification.
- A structured CLI layout with clear separation of packet details. Use spacing and indentation to improve readability.