import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import { 
  ArrowLeft, 
  Terminal, 
  Cpu, 
  Clock, 
  Sparkles, 
  Check, 
  Copy, 
  Award, 
  CircleDot,
  Calculator,
  HelpCircle
} from 'lucide-react';
import { questionBankData } from '../data/questionBankData.js';

const cnConcepts = [
  {
    "id": "cn_osi_model",
    "index": "01",
    "name": "OSI 7-Layer Model",
    "overview": "A theoretical framework dividing network communication into 7 distinct layers.",
    "detailedTheory": "The Open Systems Interconnection (OSI) model standardizes global networking communication. The 7 layers from top to bottom are: 7. Application (User interface, HTTP/SMTP), 6. Presentation (Encryption, Compression), 5. Session (Connection sync), 4. Transport (End-to-end, TCP/UDP), 3. Network (Routing, IP packets), 2. Data Link (Frames, MAC, error control), 1. Physical (Bits, electrical/optical signals).",
    "dryRun": "Sending data: Application (creates payload) -> Presentation (encrypts) -> Session (syncs) -> Transport (adds ports) -> Network (adds IPs) -> Data Link (adds MACs) -> Physical (sends bits). Reverted on receipt.",
    "visualTrace": "+---------------------------------+\n| 7. Application  [Data]           |\n| 6. Presentation [Data]           |\n| 5. Session      [Data]           |\n| 4. Transport    [Segment/Datagram]|\n| 3. Network      [Packet]         |\n| 2. Data Link    [Frame]          |\n| 1. Physical     [Bits]           |\n+---------------------------------+",
    "code": {
      "python": "# Conceptual packet encapsulation helper in Python\nclass Packet:\n    def __init__(self, data):\n        self.data = data\n        self.headers = {}\n\n    def add_header(self, layer, header_info):\n        self.headers[layer] = header_info\n\np = Packet(\"User Payload\")\np.add_header(\"Transport\", \"SourcePort: 80, DestPort: 54321\")\np.add_header(\"Network\", \"SourceIP: 192.168.1.1, DestIP: 8.8.8.8\")",
      "cpp": "// Simulating packet structure hierarchy\n#include <iostream>\n#include <string>\n\nstruct Segment {\n    int srcPort, destPort;\n    std::string payload;\n};\nstruct IPPacket {\n    std::string srcIP, destIP;\n    Segment segment;\n};",
      "js": "// Conceptual structure mapping\nconst packData = (data) => {\n  return {\n    payload: data,\n    headers: { transport: \"TCP:80\", network: \"IP:10.0.0.1\" }\n  };\n};"
    },
    "interviewQ": "What is the difference between a Hub, Switch, and Router in terms of OSI layers?",
    "interviewA": "A Hub operates at Layer 1 (Physical) and broadcasts all data. A Switch operates at Layer 2 (Data Link) and forwards frames using MAC addresses. A Router operates at Layer 3 (Network) and forwards packets between networks using IP addresses."
  },
  {
    "id": "cn_tcp_ip_model",
    "index": "02",
    "name": "TCP/IP Model",
    "overview": "The practical, implemented model of the internet consisting of 4 functional layers.",
    "detailedTheory": "The TCP/IP model is simpler than the OSI model. Its layers are: 1. Network Access (combines physical & data link), 2. Internet (IP routing), 3. Transport (TCP/UDP), 4. Application (combines session, presentation, and application layers). This is the protocol suite that powers the modern internet.",
    "dryRun": "1. User initiates HTTP request (Application).\n2. Handled by TCP layer (Transport Segment).\n3. Handled by IP layer (Internet Packet).\n4. Handled by Ethernet/Wi-Fi layer (Network Access Frame).\n5. Transmitted via physical medium.",
    "visualTrace": "[Application Layer]   ---> HTTP, FTP, DNS\n[Transport Layer]     ---> TCP, UDP\n[Internet Layer]      ---> IP, ICMP\n[Network Access]      ---> Ethernet, Wi-Fi",
    "code": {
      "python": "# Simulating Layer parsing order on arrival\ndef parse_tcp_ip_packet(raw_frame):\n    # 1. Strip Network Access headers\n    # 2. Strip IP headers\n    # 3. Strip TCP headers\n    # 4. Extract Application payload\n    return \"Application Data\"",
      "cpp": "// Representation of layers as structs\nstruct NetworkAccessFrame {\n    std::string srcMac, destMac;\n    std::string payload; // contains IPPacket\n};",
      "js": "// Conceptual mapping\nconst tcpIpStack = {\n  application: \"HTTP/1.1 GET\",\n  transport: \"TCP (Window size, Port)\",\n  internet: \"IP (TTL, Address)\",\n  networkAccess: \"Ethernet (Macs)\"\n};"
    },
    "interviewQ": "How does the TCP/IP model compare to the OSI model?",
    "interviewA": "The OSI model is a reference model with 7 layers, while TCP/IP is the practical standard with 4 layers. TCP/IP merges OSI Layers 5-7 into the Application layer, and OSI Layers 1-2 into the Network Access layer."
  },
  {
    "id": "cn_physical_layer",
    "index": "03",
    "name": "Physical Layer & Transmission Media",
    "overview": "Transmits raw bit streams over physical media (guided like fiber, unguided like radio).",
    "detailedTheory": "Deals with the physical link: signals, voltages, bit rate representation, and cables (twisted pair, coaxial, fiber optics). It defines how digital 1s and 0s are modulated onto analog carrier waves.",
    "dryRun": "1. Computer produces digital sequence: 1010.\n2. Network interface modulates signals (e.g. High/Low voltage or light pulses).\n3. Signal passes through optical fiber.\n4. Receiver demodulates back to bits 1010.",
    "visualTrace": "Bits:      1    0    1    0\nVoltage:  __   __   __   __\nSignal:  |  |_|  |_|  |_|  |",
    "code": {
      "python": "# Modulating bits into high/low signals\ndef modulate_bits(bit_string):\n    signals = []\n    for bit in bit_string:\n        signals.append(\"+5V (HIGH)\" if bit == '1' else \"0V (LOW)\")\n    return signals",
      "cpp": "// Simulating simple bitstream to wave translation\n#include <vector>\n#include <string>\n\nstd::vector<double> generateSignal(const std::string& bits) {\n    std::vector<double> signal;\n    for(char b : bits) {\n        signal.push_back(b == '1' ? 1.0 : -1.0);\n    }\n    return signal;\n}",
      "js": "const signals = bits => [...bits].map(b => b === '1' ? 'Light Pulse' : 'Dark')"
    },
    "interviewQ": "Why is fiber optic media superior to copper coaxial cables?",
    "interviewA": "Fiber optic cables use light pulses instead of electrical currents. They offer significantly higher bandwidth, longer transmission distances, and complete immunity to electromagnetic interference (EMI)."
  },
  {
    "id": "cn_data_link",
    "index": "04",
    "name": "Data Link Layer (Framing, Error Detection)",
    "overview": "Provides node-to-node data transfer, handling framing, flow control, and error detection (CRC).",
    "detailedTheory": "Divides network packets into frames, controls access to physical media (MAC), and detects errors using methods like parity, checksums, and Cyclic Redundancy Check (CRC). It operates locally inside a single network segment.",
    "dryRun": "Using simple parity check:\n1. Sender payload = 1010100 (Count of 1s is 3).\n2. Even parity bit is set to 1 to make total 1s count even (4).\n3. Transmitted frame = 10101001.\n4. Receiver counts 1s. If count is odd, single-bit transmission error is flagged.",
    "visualTrace": "[Frame Header] ---> [IP Packet Data] ---> [CRC Trailer]",
    "code": {
      "python": "# Implementing Simple Parity Generator\ndef generate_even_parity(data_bits):\n    ones_count = data_bits.count('1')\n    parity_bit = '1' if ones_count % 2 != 0 else '0'\n    return data_bits + parity_bit",
      "cpp": "// Simulating simple XOR checksum\n#include <string>\n\nchar calculateXORChecksum(const std::string& data) {\n    char checksum = 0;\n    for(char c : data) checksum ^= c;\n    return checksum;\n}",
      "js": "const checkParity = frame => {\n  const ones = [...frame].filter(c => c === '1').length;\n  return ones % 2 === 0; // Returns true if valid even parity\n};"
    },
    "interviewQ": "Explain the difference between error detection and error correction.",
    "interviewA": "Error detection (e.g. CRC, Checksum) checks if a frame was corrupted during transmission and requests retransmission. Error correction (e.g. Hamming Code) appends redundant bits so the receiver can reconstruct corrupted bits without retransmission."
  },
  {
    "id": "cn_network_layer",
    "index": "05",
    "name": "Network Layer (IP, Routing)",
    "overview": "Routes packets across multiple networks from source host to destination host using IP addresses.",
    "detailedTheory": "Handles logical addressing and path determination. The network layer encapsulates transport-layer segments into IP packets. Routers inspect the destination IP address of incoming packets and consult routing tables to determine the next hop.",
    "dryRun": "1. Host A sends packet to Host B (Different subnet).\n2. Host A determines path to Default Gateway (Router).\n3. Router checks Routing Table for B's IP prefix.\n4. Router forwards packet to interface matching the best match path (longest prefix match).\n5. Packet arrives at Host B's network.",
    "visualTrace": "Host A ---> [Router 1] ---> [Router 2] ---> Host B",
    "code": {
      "python": "# Mock Routing Table search lookup\nclass RoutingTable:\n    def __init__(self):\n        self.routes = {\"10.0.0.0/8\": \"Interface 1\", \"192.168.1.0/24\": \"Interface 2\"}\n\n    def route_lookup(self, ip_addr):\n        # Longest prefix match simulation\n        if ip_addr.startswith(\"192.168.1.\"):\n            return self.routes[\"192.168.1.0/24\"]\n        return \"Interface 1\"",
      "cpp": "// Simple packet router layout\n#include <string>\nstruct PacketRoute {\n    std::string destIP;\n    int ttl;\n};",
      "js": "const decrementTTL = packet => {\n  packet.ttl--;\n  return packet.ttl > 0 ? 'Forward' : 'Drop (Time Exceeded)';\n};"
    },
    "interviewQ": "What is the purpose of TTL (Time To Live) in an IP header?",
    "interviewA": "TTL prevents packets from cycling endlessly through network routing loops. Every router that forwards the packet decrements the TTL field by 1. If TTL reaches 0, the packet is discarded, and an ICMP Time Exceeded message is sent back to the source."
  },
  {
    "id": "cn_tcp_udp",
    "index": "06",
    "name": "TCP vs UDP",
    "overview": "TCP is connection-oriented, reliable, and slower; UDP is connectionless, unreliable, and fast.",
    "detailedTheory": "Transmission Control Protocol (TCP) ensures delivery, order, and integrity using flow control (sliding window), error recovery, and handshakes. User Datagram Protocol (UDP) is barebones, sending packets without verification, minimizing transmission delay. Ideal for real-time video/gaming.",
    "dryRun": "TCP: 1. Send Syn. 2. Get Syn-Ack. 3. Send Ack. 4. Transfer with seq numbers. 5. Confirm receipts.\nUDP: 1. Stream packets to target IP/port immediately. No receipts, no retry if lost.",
    "visualTrace": "TCP: [Send Segment 1] ===> [Ack 1 Received] ===> [Send Segment 2]\nUDP: [Send Datagram 1]  [Send Datagram 2]  [Send Datagram 3]",
    "code": {
      "python": "# Simple Python UDP socket listener\nimport socket\n\ndef run_udp_server():\n    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)\n    s.bind(('localhost', 9999))\n    data, addr = s.recvfrom(1024)\n    print(\"Received:\", data)\n    s.close()",
      "cpp": "// C++ TCP socket instantiation mock\n#include <sys/socket.h>\n#include <netinet/in.h>\n\nint createTcpSocket() {\n    return socket(AF_INET, SOCK_STREAM, 0); // SOCK_STREAM = TCP\n}",
      "js": "// Conceptual mapping\nconst tcpVsUdp = {\n  reliable: { tcp: true, udp: false },\n  connection: { tcp: \"Oriented\", udp: \"Connectionless\" },\n  overhead: { tcp: \"20 Bytes\", udp: \"8 Bytes\" }\n};"
    },
    "interviewQ": "Why is UDP used for DNS queries despite being unreliable?",
    "interviewA": "DNS queries are small, single-packet operations. Using UDP avoids the overhead of establishing and tearing down a TCP connection. If a UDP DNS query is lost, the client application simply timeouts and retransmits."
  },
  {
    "id": "cn_3way_handshake",
    "index": "07",
    "name": "Three-Way Handshake",
    "overview": "The protocol sequence TCP uses to establish a connection before exchanging data.",
    "detailedTheory": "Guarantees both sides are ready to communicate and sets initial sequence numbers (ISNs). Steps: 1. Client sends SYN (Synchronize flag set, seq=x). 2. Server responds with SYN-ACK (ack=x+1, seq=y). 3. Client responds with ACK (ack=y+1, seq=x+1). Connection is now established.",
    "dryRun": "Client ISN = 1000, Server ISN = 5000\n1. Client -> SYN (Seq=1000)\n2. Server -> SYN-ACK (Seq=5000, Ack=1001)\n3. Client -> ACK (Seq=1001, Ack=5001)\n4. Established.",
    "visualTrace": "Client                       Server\n  | --- SYN (Seq=x) ----------> |\n  | <--- SYN-ACK (Seq=y,Ack=x+1) |\n  | --- ACK (Seq=x+1,Ack=y+1) -> |\n[ESTABLISHED]              [ESTABLISHED]",
    "code": {
      "python": "# Simulating Handshake flags progression\nclass ConnectionState:\n    def __init__(self):\n        self.state = \"CLOSED\"\n\n    def handle_packet(self, flags):\n        if self.state == \"CLOSED\" and flags == \"SYN\":\n            self.state = \"SYN_RCVD\"\n            return \"SYN-ACK\"\n        elif self.state == \"SYN_RCVD\" and flags == \"ACK\":\n            self.state = \"ESTABLISHED\"\n            return \"NONE\"",
      "cpp": "struct TCPHeader {\n    unsigned short flags; // SYN = 0x02, ACK = 0x10\n    unsigned int seqNum;\n    unsigned int ackNum;\n};",
      "js": "const states = ['CLOSED', 'SYN_SENT', 'SYN_RECEIVED', 'ESTABLISHED'];"
    },
    "interviewQ": "Why is a 2-way handshake insufficient for TCP connection establishment?",
    "interviewA": "A 2-way handshake would allow delayed/duplicated SYN packets to open half-open connections. The 3-way handshake ensures both parties can send and receive, verifying the server's acknowledgment before allocating resources."
  },
  {
    "id": "cn_flow_control",
    "index": "08",
    "name": "Flow Control & Congestion Control",
    "overview": "Flow control protects the receiver from buffer overflow; congestion control protects the network.",
    "detailedTheory": "1. Flow Control uses the Sliding Window protocol where the receiver advertises its free buffer space (Receive Window). 2. Congestion Control prevents network collapse using states like Slow Start (doubling congestion window size exponential phase), Congestion Avoidance (additive increase), Fast Retransmit, and Fast Recovery.",
    "dryRun": "Using Slow Start (window = 1 packet):\n1. Send 1 packet. Ack received -> increase window to 2.\n2. Send 2 packets. Both Acked -> increase window to 4.\n3. Send 4 packets. One lost -> set window threshold (ssthresh), reset or halve window.",
    "visualTrace": "Slow Start: Window Size 1 -> 2 -> 4 -> 8 -> ... (exponential)\nCongestion Avoidance: Window Size (ssthresh reached) 8 -> 9 -> 10 -> 11 (linear)",
    "code": {
      "python": "# Simple sliding window check\ndef sliding_window_send(window_size, data):\n    sent = 0\n    while sent < len(data):\n        # Send batch up to window_size\n        batch = data[sent:sent+window_size]\n        print(\"Sending:\", batch)\n        sent += window_size",
      "cpp": "// Mock representation of Congestion State variables\nstruct CongestionControlState {\n    int cwnd; // Congestion Window\n    int ssthresh; // Slow start threshold\n    void onAckReceived() {\n        if (cwnd < ssthresh) cwnd *= 2; // Slow Start\n        else cwnd += 1; // Congestion Avoidance\n    }\n};",
      "js": "const adjustWindow = (window, limit) => window < limit ? window * 2 : window + 1;"
    },
    "interviewQ": "What is the difference between TCP Flow Control and Congestion Control?",
    "interviewA": "Flow Control coordinates speeds between a fast sender and a slow receiver to prevent buffer overflows. Congestion Control dynamically regulates data rates based on shared network capacity and drop indicators.",
    "numericalExample": {
      "question": "A sliding window protocol is used on a 1 Gbps link with a round-trip time (RTT) of 80 ms. If packet size is 1000 bytes, find the minimum window size required to achieve 100% link utilization.",
      "solution": "Link Bandwidth (B) = 1 Gbps = 10^9 bits/sec\nRTT = 80 ms = 0.08 sec\nPacket Size (L) = 1000 bytes = 8000 bits\n\nTransmission Delay (Tx) = L / B = 8000 / 10^9 = 8 * 10^-6 sec = 0.008 ms\nRound Trip Time (RTT) = 80 ms\n\nMinimum Window Size (W) to achieve 100% utilization:\nW >= (Tx + RTT) / Tx\n  = (0.008 + 80) / 0.008\n  = 80.008 / 0.008\n  = 10001 packets",
      "answer": "Window Size = 10,001 packets"
    }
  },
  {
    "id": "cn_http_https",
    "index": "09",
    "name": "HTTP vs HTTPS",
    "overview": "HTTP sends plaintext web resources; HTTPS encrypts data using SSL/TLS protocols.",
    "detailedTheory": "HTTP is application-layer text transmission (Default port 80). HTTPS (port 443) wraps standard HTTP inside a Secure Socket Layer/Transport Layer Security (SSL/TLS) session. This guarantees encryption (prevents eavesdropping), data integrity, and authentication via certificates.",
    "dryRun": "HTTPS Connection sequence:\n1. Client requests page, sends TLS options.\n2. Server shares certificate containing its public key.\n3. Client validates certificate with CA public keys.\n4. Client generates symmetric session key, encrypts it using server public key, sends to server.\n5. Both encrypt all future payloads with session key.",
    "visualTrace": "[Client] ===(HTTP GET Plaintext)===> [Internet (Vulnerable)]\n[Client] ===(HTTPS encrypted TLS)===> [Internet (Secure)]",
    "code": {
      "js": "// Fetch request showing secure HTTPS address call\nfetch('https://api.github.com/users/octocat')\n  .then(response => response.json())\n  .then(data => console.log(data));",
      "python": "# Making secure request in Python\nimport urllib.request\n\n# Automatically handles SSL handshake\nresponse = urllib.request.urlopen('https://www.google.com')\nhtml = response.read()",
      "cpp": "// C++ requires openSSL or libcurl integration to initiate https connections\n// curl_easy_setopt(curl, CURLOPT_URL, \"https://example.com\");"
    },
    "interviewQ": "Explain symmetric vs asymmetric encryption in HTTPS.",
    "interviewA": "HTTPS uses asymmetric encryption (public/private keys) during the initial TLS handshake to securely verify the server and agree on a session key. It then uses symmetric encryption (faster) for ongoing communication."
  },
  {
    "id": "cn_dns",
    "index": "10",
    "name": "DNS (Domain Name System)",
    "overview": "Translates human-readable domain names (google.com) to machine IP addresses.",
    "detailedTheory": "DNS acts as the phonebook of the web, querying recursive servers, root servers, Top-Level Domain (TLD) servers (.com, .org), and Authoritative Name Servers to resolve domain queries. Uses UDP port 53 for speed.",
    "dryRun": "Client queries google.com:\n1. Checks browser cache -> local OS hosts cache.\n2. Queries Resolver (e.g. 8.8.8.8).\n3. Resolver queries Root Name Server (returns .com TLD IP).\n4. Resolver queries TLD Name Server (returns Google name server IP).\n5. Resolver queries Authoritative Name Server -> returns IP address.\n6. Resolver replies to client.",
    "visualTrace": "Client ---> Resolver ---> Root Server ---> TLD (.com) ---> Authoritative ---> Client",
    "code": {
      "python": "# Resolving hostname using Python socket API\nimport socket\n\nip_address = socket.gethostbyname('google.com')\nprint(\"google.com IP:\", ip_address)",
      "cpp": "// Resolving address using getaddrinfo\n#include <netdb.h>\n#include <iostream>\n\nvoid resolve(const char* host) {\n    struct addrinfo* res;\n    getaddrinfo(host, NULL, NULL, &res);\n    // res->ai_addr contains IP details\n}",
      "js": "const dnsLookup = async domain => {\n  // Simulated query returning IP address\n  return domain === 'google.com' ? '142.250.190.46' : '0.0.0.0';\n};"
    },
    "interviewQ": "What is the difference between Recursive and Iterative DNS queries?",
    "interviewA": "In a recursive query, the client demands the resolver locate the final IP, forcing the resolver to query other servers. In an iterative query, the queried server responds directly with the IP of the next server to check."
  },
  {
    "id": "cn_ip_addressing",
    "index": "11",
    "name": "IP Addressing (IPv4 vs IPv6)",
    "overview": "The standard network identification systems: IPv4 uses 32 bits; IPv6 uses 128 bits.",
    "detailedTheory": "IPv4 provides ~4.3 billion addresses (represented in dotted-decimal format: 192.168.1.1). IPv6 was developed to solve address exhaustion, providing 3.4 x 10^38 addresses (represented in hexadecimal format: 2001:db8::ff00:42:8329), automatically incorporating IP security configurations.",
    "dryRun": "IPv4: 4 octets separated by dots (e.g. 172.16.254.1).\nIPv6: 8 groups of 4 hex digits separated by colons (e.g. 3ffe:1900:4545:3:200:f8ff:fe21:67cf). Collapsible contiguous zero groups are represented as double colons (::).",
    "visualTrace": "IPv4: [8 bits].[8 bits].[8 bits].[8 bits] = 32 bits\nIPv6: [16 bits]:[16]:[16]:[16]:[16]:[16]:[16]:[16] = 128 bits",
    "code": {
      "python": "# Parsing and validating IPv4 address\nimport ipaddress\n\ntry:\n    ip = ipaddress.ip_address('192.168.1.1')\n    print(f\"{ip} is IPv{ip.version}\")\nexcept ValueError:\n    print(\"Invalid IP\")",
      "cpp": "// checking address family type\n#include <arpa/inet.h>\n#include <iostream>\n\nvoid checkIPFamily(const char* ipStr) {\n    struct in_addr dst;\n    if (inet_pton(AF_INET, ipStr, &dst) == 1) std::cout << \"IPv4\\n\";\n    else std::cout << \"Not IPv4 (Check IPv6)\\n\";\n}",
      "js": "const checkIpType = ip => ip.includes(':') ? 'IPv6' : 'IPv4';"
    },
    "interviewQ": "Why did IPv6 introduce double colons (::) in representation?",
    "interviewA": "Because 128-bit addresses are long, IPv6 allows replacing consecutive 16-bit blocks of all zeros with a double colon (::). This compression can be applied only once per address to avoid ambiguity."
  },
  {
    "id": "cn_subnetting",
    "index": "12",
    "name": "Subnetting & CIDR",
    "overview": "Divides a single physical IP network into smaller logical sub-networks using subnet masks.",
    "detailedTheory": "Classless Inter-Domain Routing (CIDR) uses masks to identify the split between network prefix bits and host identifier bits (e.g. /24 implies 24 bits are network ID, leaving 8 bits for host addresses). This helps prevent IP allocation waste.",
    "dryRun": "Using IP 192.168.1.10 with Subnet Mask /26 (255.255.255.192):\n1. The first 26 bits are locked as Network ID.\n2. The remaining 6 bits are host ID (2^6 = 64 addresses per subnet).\n3. Host range: 192.168.1.0 to 192.168.1.63 (0 is net ID, 63 is broadcast).",
    "visualTrace": "IP: [24 bits network ID | 2 bits subnet ID | 6 bits host ID]",
    "code": {
      "python": "# Generating hosts in a CIDR subnet\nimport ipaddress\n\nnet = ipaddress.ip_network('192.168.1.0/26')\nprint(\"Total Hosts:\", net.num_addresses - 2) # Exclude NetID & Broadcast",
      "cpp": "// Simulating bitwise AND network division\n#include <iostream>\n\nunsigned int getNetworkAddress(unsigned int ip, unsigned int mask) {\n    return ip & mask;\n}",
      "js": "const getMask = cidr => { // e.g. 24 -> 255.255.255.0\n  return cidr === 24 ? '255.255.255.0' : 'Other';\n};"
    },
    "interviewQ": "Why are two addresses subtracted when calculating available hosts in a subnet?",
    "interviewA": "The first address (host bits all 0) is reserved as the Network Address to identify the subnet itself. The last address (host bits all 1) is reserved as the Broadcast Address to send packets to all hosts on the subnet.",
    "numericalExample": {
      "question": "Given the IP address block 192.168.10.0/27, find: 1) Subnet Mask, 2) Total Subnets possible from a /24 class C network, 3) Usable Hosts per subnet.",
      "solution": "1. Subnet Mask:\n   /27 means 27 network bits. The first 3 octets have 24 bits (255.255.255), fourth octet has 3 bits -> 128 + 64 + 32 = 224.\n   Mask = 255.255.255.224\n\n2. Total Subnets from /24:\n   Subnet bits borrowed = 27 - 24 = 3 bits.\n   Total Subnets = 2^3 = 8 subnets.\n\n3. Usable Hosts per Subnet:\n   Host bits remaining = 32 - 27 = 5 bits.\n   Usable Hosts = (2^5) - 2 = 32 - 2 = 30 hosts.",
      "answer": "Subnet Mask = 255.255.255.224, 8 Subnets, 30 Usable Hosts per Subnet"
    }
  },
  {
    "id": "cn_nat",
    "index": "13",
    "name": "NAT (Network Address Translation)",
    "overview": "Translates private internal IP addresses to a single public IP to communicate externally.",
    "detailedTheory": "Conserves IPv4 addresses by allowing entire private subnets (e.g. 192.168.0.0/16) to share a single public IP address. The NAT gateway (router) updates the source IP and source port in packet headers and maintains translation tables to route replies back.",
    "dryRun": "Private Host (192.168.1.5:5400) requests Google Web Page:\n1. Router receives packet, modifies Source IP to Public IP (82.10.15.5) and Source Port to 9001.\n2. Router adds mapping (192.168.1.5:5400 <-> 82.10.15.5:9001) to NAT table.\n3. Reply returns to 82.10.15.5:9001.\n4. Router translates packet back to 192.168.1.5:5400.",
    "visualTrace": "[Private IP: 192.168.1.10] ---> [Router (NAT Table)] ---> [Internet Public IP: 8.8.8.8]",
    "code": {
      "python": "# Conceptual NAT Translation Mapping\nclass NATTable:\n    def __init__(self):\n        self.table = {}\n        self.port_pool = 9000\n\n    def translate_outbound(self, src_ip, src_port):\n        assigned_port = self.port_pool\n        self.port_pool += 1\n        self.table[assigned_port] = (src_ip, src_port)\n        return \"82.10.15.5\", assigned_port",
      "cpp": "// Basic representation of NAT lookup entry\nstruct NATEntry {\n    std::string internalIP;\n    int internalPort;\n    int publicPort;\n};",
      "js": "const natTranslate = port => 'Translated back to internal address';"
    },
    "interviewQ": "What is the difference between Static NAT, Dynamic NAT, and PAT?",
    "interviewA": "Static NAT maps a single private IP to a single public IP (1-to-1). Dynamic NAT maps private IPs to a pool of public IPs. PAT (Port Address Translation / NAT Overload) maps multiple private IPs to a single public IP by modifying source ports."
  },
  {
    "id": "cn_routing_protocols",
    "index": "14",
    "name": "Routing Protocols (OSPF, BGP, RIP)",
    "overview": "Rules routers use to discover paths and forward packets (OSPF uses link-state; BGP uses path-vector).",
    "detailedTheory": "1. RIP: Distance-vector routing, uses hop counts (max 15). 2. OSPF: Link-state routing inside an Autonomous System, uses Dijkstra's algorithm to calculate shortest paths. 3. BGP: Path-vector protocol used to route traffic between Autonomous Systems (the core of global internet routing).",
    "dryRun": "Using OSPF (Dijkstra's Shortest Path algorithm):\n1. Router constructs network graph with link costs (based on bandwidth).\n2. Computes shortest path tree from source node.\n3. Installs path to target subnet in Routing Table.\n4. Link failure triggers Link State Advertisement (LSA) updates.",
    "visualTrace": "Path Options:\nPath 1: Router A -> Router B -> Router C (Hop count=2, Bandwidth=100 Mbps) [OSPF Choice]\nPath 2: Router A -> Router C (Hop count=1, Bandwidth=56 Kbps)          [RIP Choice]",
    "code": {
      "python": "# Dijkstra calculation simulation concept\nimport heapq\n\ndef calculate_shortest_path(graph, start):\n    distances = {node: float('infinity') for node in graph}\n    distances[start] = 0\n    queue = [(0, start)]\n    while queue:\n        curr_dist, curr_node = heapq.heappop(queue)\n        # Relax adjacent edges\n    return distances",
      "cpp": "// Simulating simple hop calculation\n#include <algorithm>\n#include <vector>\n\nint calculateRIPCost(int currentHop) {\n    if (currentHop >= 15) return 16; // 16 = Infinity / Unreachable in RIP\n    return currentHop + 1;\n}",
      "js": "const ripLimit = hops => hops > 15 ? 'Unreachable' : 'Forward';"
    },
    "interviewQ": "Why is BGP called a Path Vector protocol and when is it used?",
    "interviewA": "BGP is used to route traffic between Autonomous Systems (AS) on the internet. It is path-vector because it includes the list of all AS numbers that must be traversed to reach the target, allowing detection of routing loops."
  },
  {
    "id": "cn_arp",
    "index": "15",
    "name": "ARP (Address Resolution Protocol)",
    "overview": "Maps an IP address to a physical MAC address within a local network segment.",
    "detailedTheory": "Operating between OSI Layers 2 and 3, ARP resolves logical IP addresses to hardware MAC addresses. If Host A wants to send a packet to Host B on the same LAN, it checks its local ARP cache. If B's IP isn't cached, Host A broadcasts an ARP Request, and Host B replies with its MAC address.",
    "dryRun": "Host A wants to resolve MAC for 192.168.1.5:\n1. Checks local cache (not found).\n2. Broadcasts: 'Who has 192.168.1.5? Tell 192.168.1.2' to MAC FF:FF:FF:FF:FF:FF.\n3. All hosts receive request. Host B (192.168.1.5) replies: 'I have it, my MAC is 00:0a:95:9d:68:16'.\n4. Host A updates cache and transmits payload.",
    "visualTrace": "ARP Request: [Broadcast to all] ---> Who has 192.168.1.5?\nARP Reply:   [Unicast to Sender] ---> I have it, my MAC is 00:0a:95...",
    "code": {
      "python": "# Simple Python dict representing ARP cache lookup\nclass ARPCache:\n    def __init__(self):\n        self.cache = {\"192.168.1.1\": \"00:1A:2B:3C:4D:5E\"}\n\n    def resolve(self, ip_addr):\n        if ip_addr in self.cache:\n            return self.cache[ip_addr]\n        print(\"Triggering ARP Broadcast request...\")\n        return None",
      "cpp": "// Mock representation of ARP Frame Header\nstruct ARPHeader {\n    unsigned short hardwareType;\n    unsigned short protocolType;\n    unsigned char senderMac[6];\n    unsigned char senderIP[4];\n    unsigned char targetMac[6];\n    unsigned char targetIP[4];\n};",
      "js": "const arpResolve = (ip, cache) => cache[ip] || 'Broadcast ARP Request';"
    },
    "interviewQ": "What is ARP Poisoning (Spoofing)?",
    "interviewA": "ARP Poisoning is a security attack where an attacker sends unsolicited, malicious ARP replies to a local switch, linking the attacker's MAC address with a target host's IP (like the default gateway). This routes victim traffic through the attacker."
  },
  {
    "id": "cn_firewalls",
    "index": "16",
    "name": "Firewalls & VPN",
    "overview": "Firewalls inspect/filter network traffic; VPNs create secure, encrypted tunnels over public networks.",
    "detailedTheory": "1. Firewalls filter packets based on rules. They can be packet-filtering (stateless) or stateful (inspecting connection state). 2. Virtual Private Networks (VPNs) encrypt traffic at the packet level, routing it through a secure tunnel to keep communication private on public Wi-Fi networks.",
    "dryRun": "Using Stateful Firewall:\n1. Incoming packet from 8.8.8.8:80 arrives.\n2. Firewall checks connection table. No record matches an outbound request from an internal host to 8.8.8.8.\n3. The packet is dropped.\n4. If an internal host had initiated the request, a state table entry would exist, allowing the reply packet through.",
    "visualTrace": "[Internal LAN] ===(Firewall Filters)===> [Internet]\n[Internal Host] ===(Encrypted VPN Tunnel)===> [VPN Gateway] ---> [Internet]",
    "code": {
      "python": "# Stateful firewall simulation logic\nclass Firewall:\n    def __init__(self):\n        self.state_table = set() # Stores active outgoing connection keys (IP, Port)\n\n    def filter_packet(self, src_ip, dest_ip, port, is_inbound):\n        if not is_inbound:\n            self.state_table.add((dest_ip, port))\n            return \"ALLOW\"\n        if (src_ip, port) in self.state_table:\n            return \"ALLOW\"\n        return \"BLOCK\"",
      "cpp": "// Simulating rule matcher\n#include <string>\n#include <vector>\n\nstruct Rule {\n    std::string ip;\n    int port;\n    bool allow;\n};",
      "js": "const processPacket = (p, rules) => 'Allow/Block based on ACL matched';"
    },
    "interviewQ": "What is the difference between a stateless and a stateful firewall?",
    "interviewA": "A stateless firewall inspects packets individually against static access lists (IP, Port) without context. A stateful firewall tracks the state of active connections, automatically allowing return traffic for established sessions."
  },
  {
    "id": "cn_ssl_tls",
    "index": "17",
    "name": "SSL/TLS Encryption",
    "overview": "The standard protocol suite for encrypting transport layers, verifying hosts using certificates.",
    "detailedTheory": "Transport Layer Security (TLS, successor to SSL) secures HTTP, SMTP, and other connections. The handshake uses asymmetric encryption to exchange credentials and establish symmetric session keys for ongoing encryption.",
    "dryRun": "Handshake execution:\n1. Client Hello: sends supported cipher suites and a random string.\n2. Server Hello: returns the selected cipher suite, server random string, and SSL certificate.\n3. Key Exchange: Client verifies certificate, encrypts a pre-master secret using the server's public key, and sends it back. Both generate symmetric session keys.",
    "visualTrace": "Client --- ClientHello ---> Server\nClient <--- ServerHello + Cert --- Server\nClient --- Encrypted Pre-Master Secret ---> Server\n(Future data encrypted using symmetric session keys)",
    "code": {
      "python": "# Simple Python TLS client wrapper mock\nimport socket, ssl\n\ndef connect_securely():\n    context = ssl.create_default_context()\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    secure_sock = context.wrap_socket(s, server_hostname='www.python.org')\n    secure_sock.connect(('www.python.org', 443))",
      "cpp": "// Conceptual TLS wrapper initialization\n// SSL_library_init();\n// SSL_CTX* ctx = SSL_CTX_new(TLS_client_method());",
      "js": "const secureConn = () => 'Initiate TLS negotiation using local root CA certs';"
    },
    "interviewQ": "How does a client verify that a server's SSL certificate is trustworthy?",
    "interviewA": "The client checks the certificate's digital signature using the public keys of pre-installed Certificate Authorities (CAs). It also verifies that the current date falls within the certificate's validity period and matches the domain name."
  },
  {
    "id": "cn_socket_programming",
    "index": "18",
    "name": "Socket Programming",
    "overview": "The API endpoint used to build network applications (TCP listener and client sockets).",
    "detailedTheory": "Sockets provide a programming interface for the transport layer. A TCP Server: 1. Creates socket. 2. Binds to IP and Port. 3. Listens for connections. 4. Accepts incoming client connections. 5. Reads/writes data blocks. 6. Closes socket.",
    "dryRun": "TCP Server starts:\n1. calls socket() -> assigns file descriptor.\n2. calls bind(8080) -> binds to port 8080.\n3. calls listen() -> prepares ready queue.\n4. calls accept() -> blocks waiting for connection.\n5. Client connects -> accept returns new socket descriptor dedicated to that client.",
    "visualTrace": "Server: socket() -> bind() -> listen() -> accept() (Blocks) -> Read/Write\nClient: socket() -----------------------> connect() ------------> Read/Write",
    "code": {
      "python": "# Complete Echo TCP Server in Python\nimport socket\n\ndef run_server():\n    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n    s.bind(('localhost', 8080))\n    s.listen(1)\n    conn, addr = s.accept()\n    print(\"Connected by\", addr)\n    data = conn.recv(1024)\n    conn.sendall(data)\n    conn.close()",
      "cpp": "// Simple C++ TCP client connection snippet\n#include <sys/socket.h>\n#include <arpa/inet.h>\n#include <unistd.h>\n\nint main() {\n    int sock = socket(AF_INET, SOCK_STREAM, 0);\n    struct sockaddr_in serv_addr;\n    serv_addr.sin_family = AF_INET;\n    serv_addr.sin_port = htons(8080);\n    inet_pton(AF_INET, \"127.0.0.1\", &serv_addr.sin_addr);\n    connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));\n    close(sock);\n}",
      "js": "// Node.js net module server\nconst net = require('net');\nconst server = net.createServer(socket => {\n  socket.write('Echo server\\r\\n');\n  socket.pipe(socket);\n});\nserver.listen(8080, '127.0.0.1');"
    },
    "interviewQ": "What is the difference between the listening socket and connection socket in a TCP server?",
    "interviewA": "The listening socket remains bound to the port (e.g. 8080) and accepts incoming client connection requests. Once accepted, the OS creates a new connection socket dedicated to that specific client, freeing the listening socket to accept other requests."
  },
  {
    "id": "cn_dhcp",
    "index": "19",
    "name": "DHCP (Dynamic Host Configuration)",
    "overview": "Dynamically assigns IP addresses, subnet masks, and default gateways to joining network clients.",
    "detailedTheory": "Operating on UDP ports 67 (server) and 68 (client), DHCP prevents manual IP configuration. It uses the DORA sequence: 1. Discover (Client broadcasts). 2. Offer (Servers reply unicast/broadcast). 3. Request (Client requests offered IP). 4. Acknowledgment (Server confirms and sets lease time).",
    "dryRun": "Client joins Wi-Fi network:\n1. Client broadcasts DHCPDISCOVER: 'I need an IP'.\n2. DHCP Server replies DHCPOFFER: 'How about 192.168.1.15?'.\n3. Client replies DHCPREQUEST: 'Yes, I'll take 192.168.1.15'.\n4. Server replies DHCPACK: 'Granted for 24 hours. Gateway: 192.168.1.1'.",
    "visualTrace": "Client                                   DHCP Server\n  | --- DHCPDISCOVER (Broadcast) ----------> |\n  | <--- DHCPOFFER (Unicast) ---------------- |\n  | --- DHCPREQUEST (Broadcast) ------------> |\n  | <--- DHCPACK (Unicast) ------------------ |",
    "code": {
      "python": "# Simulating DHCP IP Pool lease allocation\nclass DHCPServer:\n    def __init__(self):\n        self.ip_pool = [\"192.168.1.100\", \"192.168.1.101\"]\n        self.leases = {}\n\n    def handle_request(self, mac_addr):\n        if mac_addr in self.leases:\n            return self.leases[mac_addr]\n        ip = self.ip_pool.pop(0)\n        self.leases[mac_addr] = ip\n        return ip",
      "cpp": "// Mock representation of DHCP message format\nstruct DHCPMessage {\n    unsigned char op; // 1 = BootRequest, 2 = BootReply\n    unsigned char htype;\n    unsigned char hlen;\n    unsigned int xid; // Transaction ID\n    unsigned int yiaddr; // Client IP address (Your IP Address)\n};",
      "js": "const processDhcp = mac => 'Assign IP address with default lease configurations';"
    },
    "interviewQ": "Why is DHCPREQUEST broadcast instead of unicast?",
    "interviewA": "Because there could be multiple DHCP servers on the local network that sent offers. Broadcasting the request notifies the selected server to lock the IP lease, while informing other servers to release their reserved offers."
  }
];

const CnTheory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [activeLang, setActiveLang] = useState('python'); // Python default
  const [selectedConceptId, setSelectedConceptId] = useState(() => {
    const fromUrl = searchParams.get('concept');
    if (fromUrl && cnConcepts.some(c => c.id === fromUrl)) {
      return fromUrl;
    }
    return 'cn_osi_model';
  });
  const [completedConcepts, setCompletedConcepts] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [revealedExplanations, setRevealedExplanations] = useState({});

  const handleSelectMCQ = (questionId, option) => {
    if (userAnswers[questionId] !== undefined) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    setRevealedExplanations(prev => ({ ...prev, [questionId]: true }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('completed_cn_concepts');
    if (saved) {
      try {
        setCompletedConcepts(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const toggleConceptCompleted = (id, e) => {
    e.stopPropagation();
    let newCompleted;
    if (completedConcepts.includes(id)) {
      newCompleted = completedConcepts.filter(x => x !== id);
    } else {
      newCompleted = [...completedConcepts, id];
    }
    setCompletedConcepts(newCompleted);
    localStorage.setItem('completed_cn_concepts', JSON.stringify(newCompleted));
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'template') {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2000);
    } else {
      setCopiedExample(true);
      setTimeout(() => setCopiedExample(false), 2000);
    }
  };

  const selectedConcept = cnConcepts.find(c => c.id === selectedConceptId) || cnConcepts[0];

  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />
      
      <div style={{ maxWidth: '1450px', margin: '40px auto', padding: '0 24px' }}>
        <Link 
          to="/preparation" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: '#10b981', 
            fontWeight: 700, 
            fontSize: '0.86rem', 
            textDecoration: 'none',
            marginBottom: '24px',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
        >
          <ArrowLeft className="size-4" /> Back to Preparation Hub
        </Link>

        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
          borderRadius: '24px',
          padding: '36px 40px',
          color: '#ffffff',
          boxShadow: '0 10px 30px rgba(17, 24, 39, 0.08)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(156,163,175,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ padding: '6px 12px', background: 'rgba(75, 85, 99, 0.4)', color: '#d1d5db', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  CN Masterclass
                </span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>•</span>
                <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock className="size-4 text-gray-400" /> Computer Networks Syllabus
                </span>
              </div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
                Computer Networks (CN) Notes
              </h1>
              <p style={{ fontSize: '0.94rem', color: '#d1d5db', maxWidth: '750px', lineHeight: '1.5', margin: 0 }}>
                Master OSI Layers, TCP/IP, Addressing, Routing Protocols, DNS, HTTP/HTTPS, NAT, ARP, and Network Security.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '800px', overflowY: 'auto', paddingRight: '4px' }}>
            {cnConcepts.map((concept) => {
              const isSelected = concept.id === selectedConceptId;
              const isCompleted = completedConcepts.includes(concept.id);
              
              return (
                <div 
                  key={concept.id}
                  onClick={() => setSelectedConceptId(concept.id)}
                  style={{
                    background: isSelected ? 'linear-gradient(to right, #f3f4f6, #e5e7eb)' : '#ffffff',
                    border: isSelected ? '2px solid #4b5563' : '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isSelected ? '0 4px 12px rgba(75, 85, 99, 0.06)' : '0 1px 3px rgba(0,0,0,0.01)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#9ca3af';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                    <div 
                      onClick={(e) => toggleConceptCompleted(concept.id, e)}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: isCompleted ? '2px solid #4b5563' : '2px solid #cbd5e1',
                        background: isCompleted ? '#4b5563' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                    >
                      {isCompleted && <Check className="size-3.5 text-white stroke-[3]" />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700 }}>
                        Concept {concept.index}
                      </span>
                      <strong style={{
                        fontSize: '0.86rem',
                        color: isSelected ? '#374151' : '#1e293b',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '2px'
                      }}>
                        {concept.name}
                      </strong>
                    </div>
                  </div>

                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '10px',
                    background: isCompleted ? '#e5e7eb' : '#f1f5f9',
                    color: isCompleted ? '#374151' : '#64748b',
                    flexShrink: 0
                  }}>
                    {isCompleted ? 'Mastered' : 'Todo'}
                  </span>
                </div>
              );
            })}
          </div>

          {/* RIGHT Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Core Overview & Detailed Theory */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f3f4f6', color: '#4b5563', display: 'grid', placeItems: 'center' }}>
                    <CircleDot className="size-5" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {selectedConcept.name}
                    </h2>
                    <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                      Syllabus Section {selectedConcept.index}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => toggleConceptCompleted(selectedConcept.id, e)}
                  style={{
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: completedConcepts.includes(selectedConcept.id) ? '#e5e7eb' : '#4b5563',
                    color: completedConcepts.includes(selectedConcept.id) ? '#374151' : '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  <Check className="size-4" />
                  {completedConcepts.includes(selectedConcept.id) ? 'Mastered' : 'Mark as Mastered'}
                </button>
              </div>

              <div style={{ padding: '20px', background: '#f8fafc', borderLeft: '4px solid #4b5563', borderRadius: '8px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b', margin: '0 0 6px 0' }}>Intuition</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  {selectedConcept.overview}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Deep Theory & Why We Use It</h4>
                <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                  {selectedConcept.detailedTheory}
                </p>
              </div>
            </section>

            {/* Implementation Blueprints */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f3f4f6', color: '#4b5563', display: 'grid', placeItems: 'center' }}>
                    <Terminal className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Syntax & Implementation</h3>
                </div>

                <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '10px' }}>
                  {['python', 'cpp', 'js'].map(l => (
                    <button 
                      key={l}
                      onClick={() => setActiveLang(l)} 
                      style={{ 
                        border: 'none', 
                        padding: '6px 12px', 
                        fontSize: '0.78rem', 
                        fontWeight: 800, 
                        borderRadius: '8px', 
                        cursor: 'pointer', 
                        background: activeLang === l ? '#ffffff' : 'transparent', 
                        color: activeLang === l ? '#0f172a' : '#64748b', 
                        boxShadow: activeLang === l ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' 
                      }}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <pre style={{
                  background: '#0f172a',
                  color: '#e2e8f0',
                  padding: '24px',
                  borderRadius: '16px',
                  fontSize: '0.88rem',
                  fontFamily: 'monospace, Courier New',
                  overflowX: 'auto',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  <code>{selectedConcept.code[activeLang] || `// No code snippet loaded.`}</code>
                </pre>
                <button
                  onClick={() => handleCopy(selectedConcept.code[activeLang] || '', 'template')}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '8px',
                    padding: '8px',
                    color: '#e2e8f0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                >
                  {copiedTemplate ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                </button>
              </div>
            </section>

            {/* Visual Trace & Dry Run */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f3f4f6', color: '#4b5563', display: 'grid', placeItems: 'center' }}>
                  <Sparkles className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Visual Trace & Dry Run</h3>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Execution Steps</h4>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  {selectedConcept.dryRun}
                </p>
              </div>

              {selectedConcept.visualTrace && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px 0' }}>Memory/Packet Representation Diagram</h4>
                  <pre style={{
                    background: '#0f172a',
                    color: '#38bdf8',
                    padding: '20px',
                    borderRadius: '12px',
                    fontSize: '0.86rem',
                    fontFamily: 'monospace, Courier New',
                    overflowX: 'auto',
                    lineHeight: '1.5',
                    border: '1px solid #1e293b',
                    margin: 0
                  }}>
                    <code>{selectedConcept.visualTrace}</code>
                  </pre>
                </div>
              )}
            </section>

            {/* Numerical Example & Solution */}
            {selectedConcept.numericalExample && (
              <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f3f4f6', color: '#4b5563', display: 'grid', placeItems: 'center' }}>
                    <Calculator className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Numerical Example & Solution</h3>
                </div>

                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                  <strong style={{ fontSize: '0.88rem', color: '#374151', display: 'block', marginBottom: '8px' }}>
                    Problem: {selectedConcept.numericalExample.question}
                  </strong>
                  <div style={{ fontSize: '0.86rem', color: '#4b5563', lineHeight: '1.6' }}>
                    <strong>Steps & Calculation:</strong>
                    <pre style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb', marginTop: '8px', fontFamily: 'monospace', fontSize: '0.82rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                      {selectedConcept.numericalExample.solution}
                    </pre>
                    <div style={{ marginTop: '12px', fontSize: '0.9rem' }}>
                      <strong>Final Answer:</strong> <span style={{ fontWeight: 800, color: '#1f2937' }}>{selectedConcept.numericalExample.answer}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* MCQ Practice Section */}
            {questionBankData.filter(q => q.conceptId === selectedConcept.id).length > 0 && (
              <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                    <HelpCircle className="size-5" />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Concept MCQ Challenge</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {questionBankData.filter(q => q.conceptId === selectedConcept.id).map((q, idx) => {
                    const selectedAns = userAnswers[q.id];
                    const isAnswered = selectedAns !== undefined;
                    const showExp = !!revealedExplanations[q.id];

                    return (
                      <div key={q.id} style={{ borderBottom: idx < questionBankData.filter(q => q.conceptId === selectedConcept.id).length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: idx < questionBankData.filter(q => q.conceptId === selectedConcept.id).length - 1 ? '20px' : '0' }}>
                        <p style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '14px', lineHeight: '1.5' }}>
                          <strong>Q{idx + 1}:</strong> {q.question}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '14px' }}>
                          {q.options.map(option => {
                            const isThisSelected = selectedAns === option;
                            const isCorrect = q.answer === option;

                            let optStyle = {
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              color: '#334155',
                              cursor: isAnswered ? 'default' : 'pointer'
                            };

                            if (isAnswered) {
                              if (isCorrect) {
                                optStyle = {
                                  background: '#d1fae5',
                                  border: '1px solid #10b981',
                                  color: '#065f46',
                                  fontWeight: 800,
                                  cursor: 'default'
                                };
                              } else if (isThisSelected) {
                                optStyle = {
                                  background: '#fee2e2',
                                  border: '1px solid #ef4444',
                                  color: '#991b1b',
                                  fontWeight: 800,
                                  cursor: 'default'
                                };
                              } else {
                                optStyle = {
                                  background: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                  color: '#94a3b8',
                                  cursor: 'default'
                                };
                              }
                            }

                            return (
                              <button
                                key={option}
                                disabled={isAnswered}
                                onClick={() => handleSelectMCQ(q.id, option)}
                                style={{
                                  width: '100%',
                                  textAlign: 'left',
                                  padding: '12px 18px',
                                  borderRadius: '10px',
                                  fontSize: '0.84rem',
                                  fontWeight: 600,
                                  transition: 'all 0.15s',
                                  ...optStyle
                                }}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div>
                            <button
                              onClick={() => setRevealedExplanations(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#059669',
                                fontSize: '0.8rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                padding: '4px 0',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}
                            >
                              <Terminal className="size-4" />
                              {showExp ? "Hide Explanation" : "View Explanation"}
                            </button>

                            {showExp && (
                              <div style={{ marginTop: '10px', padding: '12px 16px', background: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #10b981', fontSize: '0.82rem', color: '#475569', lineHeight: '1.5' }}>
                                {q.explanation}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Standard Interview Question */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef3c7', color: '#d97706', display: 'grid', placeItems: 'center' }}>
                  <Award className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Standard Interview Question</h3>
              </div>

              <div style={{ padding: '16px 20px', background: '#fffbeb', borderRadius: '12px', border: '1px solid #fef3c7' }}>
                <strong style={{ fontSize: '0.88rem', color: '#b45309', display: 'block', marginBottom: '6px' }}>
                  Q: {selectedConcept.interviewQ}
                </strong>
                <p style={{ fontSize: '0.86rem', color: '#78350f', lineHeight: '1.5', margin: 0 }}>
                  <strong>Ans:</strong> {selectedConcept.interviewA}
                </p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CnTheory;
