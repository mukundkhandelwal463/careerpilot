import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/navbar.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Award,
  Sparkles,
  Check,
  Copy,
  Terminal,
  HelpCircle,
  Cpu,
  Database,
  Network
} from 'lucide-react';
import { questionBankData } from '../data/questionBankData.js';
import '../css/style.css';

const systemDesignConcepts = [
  {
    "id": "sys_scaling",
    "index": "01",
    "name": "Horizontal vs Vertical Scaling",
    "overview": "Scaling structures handle resource capacity growth by upgrading single nodes or adding clustered systems.",
    "detailedTheory": "Vertical scaling (scaling up) upgrades instance hardware (CPU/RAM/SSD) of a single server. It is bound by hardware limits and creates a single point of failure (SPOF). Horizontal scaling (scaling out) adds more standard machines into the resource pool, requiring load balancers, stateless request mapping, and distributed sessions, but providing unbounded scale and fault tolerance.",
    "dryRun": "Traffic growth processing:\\n1. Incoming traffic spike hits the system.\\n2. A stateless application layer allows the Load Balancer to route users to Server 1, Server 2, or Server 3 evenly.\\n3. Adding Server 4 instantly absorbs 25% of new load without downtime.",
    "visualTrace": "[Client Requests] ---> [Load Balancer] ═══╦═══> [Server 1 (Stateless)]\\n                                         ╠═══> [Server 2 (Stateless)]\\n                                         ╚═══> [Server 3 (Stateless)]",
    "code": {
      "java": "// Java Spring configuration mapping session state to Redis to make servers stateless\\n// @EnableRedisHttpSession\\n// public class HttpSessionConfig {} ",
      "cpp": "// C++ Nginx configuration template for horizontal server upstream\\n#include <string>\\nconst std::string NGINX_UPSTREAM = \"upstream backend { server srv1.example.com; server srv2.example.com; }\";",
      "python": "# Python script simulating stateless API session retrieval via external token store\\ndef handle_request(request):\\n    token = request.headers.get('Authorization')\\n    user_session = redis_client.get(token) # Stateless session lookup\\n    return f\"Processed request for User: {user_session}\"",
      "js": "// Node.js load balancer upstream route mapping stub\\n// expressApp.get('/status', (req, res) => res.send('Server instance running statelessly'));"
    },
    "interviewQ": "Why is statelessness a hard requirement for horizontal scaling?",
    "interviewA": "If an application server stores session state locally (in its own memory), subsequent requests from that client must always hit that exact same server (session affinity / sticky sessions). This limits load distribution and causes session loss if that specific machine crashes. Storing sessions in an external shared cache (like Redis) makes servers stateless, letting any server process any request."
  },
  {
    "id": "sys_dns_load_balancing",
    "index": "02",
    "name": "DNS & Load Balancing Algorithms",
    "overview": "Directing traffic logically from DNS name servers to application load balancers and nodes.",
    "detailedTheory": "DNS maps domain names to IP addresses. Geolocation DNS returns IPs closest to the client. Load balancers operate at Layer 4 (Transport: TCP/UDP, IP-based routing) or Layer 7 (Application: HTTP header/cookie-based routing). Common algorithms include Round Robin (rotates servers sequentially), Weighted Round Robin, Least Connections (routes to lowest active connection count), and IP Hashing (pins clients to specific servers).",
    "dryRun": "Weighted Round Robin selection:\\n1. Server A (weight 3), Server B (weight 1).\\n2. Request 1 -> Server A.\\n3. Request 2 -> Server A.\\n4. Request 3 -> Server A.\\n5. Request 4 -> Server B. Repeat cycle.",
    "visualTrace": "Client Query -> [GeoDNS] -> Edge Load Balancer -> [Least-Conn Router] -> Target Server",
    "code": {
      "java": "// Java Weighted Round Robin server load selector\\npublic class LoadBalancer {\\n    private List<String> servers = Arrays.asList(\"SrvA\", \"SrvA\", \"SrvA\", \"SrvB\");\\n    private int counter = 0;\\n    public synchronized String getNext() {\\n        return servers.get(counter++ % servers.size());\\n    }\\n}",
      "cpp": "// C++ load balancer algorithm header enum representation\\nenum LB_Algo { ROUND_ROBIN, LEAST_CONNECTIONS, IP_HASH };",
      "python": "# Python implementation of consistent IP hash mapping\\nimport hashlib\\ndef route_ip(client_ip, servers):\\n    ip_hash = int(hashlib.md5(client_ip.encode()).hexdigest(), 16)\\n    return servers[ip_hash % len(servers)]",
      "js": "// Node.js reverse proxy configuration stub mapping requests round-robin"
    },
    "interviewQ": "What is the difference between Layer 4 and Layer 7 Load Balancing?",
    "interviewA": "Layer 4 load balancing operates at the transport level (TCP/UDP) using IP and port configurations without inspecting packet contents, making it extremely fast. Layer 7 operates at the application level (HTTP/HTTPS), parsing headers, cookies, and URLs, allowing smart content-based routing at the cost of higher CPU overhead."
  },
  {
    "id": "sys_caching",
    "index": "03",
    "name": "Caching Strategies & CDNs",
    "overview": "Caching caches hot data locally or at global edge CDN servers to bypass database and processing bottlenecks.",
    "detailedTheory": "Caching strategies include Cache-Aside (app queries cache, reads DB on miss, updates cache), Write-Through (updates cache and DB synchronously), and Write-Back (writes to cache, updates DB asynchronously). Content Delivery Networks (CDNs) cache static assets (HTML/images/JS) and API payloads globally on Edge Servers geographically close to users to decrease Latency.",
    "dryRun": "Cache-Aside fetch:\\n1. Read Key X from Redis -> Miss.\\n2. Query MySQL -> Returns Record Y.\\n3. Write Record Y to Redis with TTL (Time To Live).\\n4. Return Record Y.",
    "visualTrace": "Client -> [CDN (Edge Cache)] -> [Application] -> [Redis (Memory Cache)] -> [MySQL DB]",
    "code": {
      "java": "// Java Spring Boot caching decorator method annotation\\n// @Cacheable(value = \"users\", key = \"#id\")\\n// public User findById(Long id) { return db.find(id); }",
      "cpp": "// C++ stub defining Cache TTL properties\\nstruct CacheEntry { std::string data; long long expiry_timestamp; };",
      "python": "# Python cache wrapper with fallback TTL validation\\nimport time\\nclass TTL_Cache:\\n    def __init__(self):\\n        self.store = {}\\n    def set(self, key, val, ttl=3600):\\n        self.store[key] = (val, time.time() + ttl)\\n    def get(self, key):\\n        if key not in self.store: return None\\n        val, exp = self.store[key]\\n        if time.time() > exp: del self.store[key]; return None\\n        return val",
      "js": "// Node.js Cache invalidation wrapper"
    },
    "interviewQ": "What is Cache Stampede and how do you prevent it?",
    "interviewA": "A cache stampede (or cache dogpiling) occurs when a highly popular key expires and multiple concurrent application threads experience a cache miss simultaneously, hitting the underlying database all at once. It is prevented using mutual exclusion locks (mutexting the database read) or calculating background updates before key expiration (probabilistic early expiration)."
  },
  {
    "id": "sys_sharding",
    "index": "04",
    "name": "Database Sharding & Consistent Hashing",
    "overview": "Horizontal partitioning of database records across multiple server shards using consistent hashing rings.",
    "detailedTheory": "Database Sharding partitions rows across multiple physical databases. Sharding can be range-based, directory-based, or hash-based. Consistent Hashing is an algorithmic technique mapping keys and nodes to a circular hash ring. It minimizes key re-allocations when a database node is added or removed, preventing system-wide re-sharding bottlenecks.",
    "dryRun": "Consistent Hashing Ring lookup:\\n1. Hash Server IPs to Ring (e.g. S1 at point 120, S2 at 340).\\n2. Hash Key 'User:101' to Ring (point 200).\\n3. Traverse clockwise on the ring to locate the first server node (matches S2 at 340).",
    "visualTrace": "Hashing Ring: [Server 1 (120)] ───> [Key User:101 (200)] ───> [Server 2 (340)]",
    "code": {
      "java": "// Java Consistent Hashing algorithm representation mapping virtual nodes\\npublic class ConsistentHash {\\n    private final SortedMap<Integer, String> circle = new TreeMap<>();\\n    public void addNode(String node, int virtualNodes) {\\n        for (int i = 0; i < virtualNodes; i++) {\\n            circle.put(hash(node + \"-\" + i), node);\\n        }\\n    }\\n}",
      "cpp": "// C++ database shard routing helper\\nint getShardId(int userId, int totalShards) { return userId % totalShards; }",
      "python": "# Python Consistent Hashing Ring prototype\\nimport hashlib\\nclass HashRing:\\n    def __init__(self, nodes=None, replicas=3):\\n        self.replicas = replicas\\n        self.ring = {}\\n        self.sorted_keys = []\\n        if nodes:\\n            for node in nodes: self.add_node(node)\\n    def add_node(self, node):\\n        for i in range(self.replicas):\\n            val = self._hash(f\"{node}-{i}\")\\n            self.ring[val] = node\\n            self.sorted_keys.append(val)\\n        self.sorted_keys.sort()\\n    def _hash(self, key):\\n        return int(hashlib.md5(key.encode()).hexdigest(), 16)\\n    def get_node(self, key):\\n        if not self.ring: return None\\n        val = self._hash(key)\\n        for sk in self.sorted_keys:\\n            if val <= sk: return self.ring[sk]\\n        return self.ring[self.sorted_keys[0]]",
      "js": "// Node.js database partitioning router"
    },
    "interviewQ": "What are virtual nodes in Consistent Hashing and why are they needed?",
    "interviewA": "Virtual nodes are multiple logical aliases mapped on the hash ring for each physical server. Without virtual nodes, physical servers can end up with highly uneven key segment boundaries, causing 'hotspots'. Virtual nodes distribute points uniformly across the ring, balancing data and load evenly across all physical hosts."
  },
  {
    "id": "sys_consistency_cap",
    "index": "05",
    "name": "CAP Theorem & PACELC",
    "overview": "Theoretical constraints defining trade-offs in distributed systems during network partitions and steady operations.",
    "detailedTheory": "The CAP Theorem states a distributed system can guarantee at most two of: Consistency (all nodes see identical data), Availability (every non-failing node returns a response), and Partition Tolerance (system continues to operate during network failures). PACELC extends this: If there is a Partition (P), trade off Availability (A) vs Consistency (C); Else (E), trade off Latency (L) vs Consistency (C).",
    "dryRun": "System Partition Handling:\\n1. Database Split splits Node A and Node B.\\n2. User writes to Node A.\\n3. A CP system blocks the write or throws an error (Consistent, not Available).\\n4. An AP system commits write to Node A, returning old data on Node B queries (Available, not Consistent).",
    "visualTrace": "CP (Consistency + Partition) vs AP (Availability + Partition)\\nSteady-State: Latency (L) vs Consistency (C) (e.g. MongoDB, Cassandra)",
    "code": {
      "java": "// Java distributed quorum check simulation\\npublic boolean checkQuorum(int nodesReplied, int totalNodes) {\\n    return nodesReplied > (totalNodes / 2); // Quorum read/write verification\\n}",
      "cpp": "// C++ PACELC configurations representation\\nenum PACELC_Type { PA_EL, PC_EC, PC_EL, PA_EC };",
      "python": "# Python simulation of Dynamo-style write quorum (W + R > N)\\ndef is_quorum_achieved(write_nodes, read_nodes, replicas):\\n    return (write_nodes + read_nodes) > replicas",
      "js": "// Node.js Cassandra write consistency level options"
    },
    "interviewQ": "Explain the PACELC theorem and give an example of an EL-configured database.",
    "interviewA": "PACELC states: In case of Partition (P), choose Availability (A) or Consistency (C); Else (E) in normal operation, choose Latency (L) or Consistency (C). An example of an AP/EL database is Cassandra: it prioritizes availability during network splits, and under normal operations, prioritizes low latency (EL) by replicating data asynchronously."
  },
  {
    "id": "sys_messaging_queues",
    "index": "06",
    "name": "Message Queues & Event Streaming",
    "overview": "Asynchronous task processing, worker scaling, and append-only event streaming logs.",
    "detailedTheory": "Message Queues (like RabbitMQ) buffer tasks, dispatching messages to workers who pull and delete them upon acknowledgment. Event Streaming systems (like Apache Kafka) store streams persistently as an ordered, append-only log on disk. Kafka organizes messages into partitions, letting consumers scale horizontally via Consumer Groups and read/replay logs at their own pace.",
    "dryRun": "Kafka Partition Read:\\n1. Producer appends key 'Order101' to Partition 2.\\n2. Consumer Group starts; Worker A reads partition 2 offset 45.\\n3. Worker commits offset 46 after processing.\\n4. Logs remain on disk for replay if Worker A crashes.",
    "visualTrace": "[Producer] ───> [Kafka Partition Log (Append Only: Offset 0, 1, 2...)] ───> [Consumer]",
    "code": {
      "java": "// Java Kafka Consumer listener method annotation\\n// @KafkaListener(topics = \"orders\", groupId = \"billing-group\")\\n// public void listen(String message) { processBilling(message); }",
      "cpp": "// C++ message broker event record struct definition\\nstruct Message { std::string topic; std::string payload; long long offset; };",
      "python": "# Python producer script using Kafka-python library simulating streaming write\\n# from kafka import KafkaProducer\\n# producer = KafkaProducer(bootstrap_servers='localhost:9092')\\n# producer.send('user-clicks', b'ClickEventLogPayload')",
      "js": "// Node.js event emitter broker simulation"
    },
    "interviewQ": "What is a consumer group in Apache Kafka?",
    "interviewA": "A consumer group is a collection of consumers that cooperate to read from a set of topic partitions. Each partition in the topic is assigned to exactly one consumer in the group. This allows parallel processing: adding more consumers scales processing throughput up to the number of partitions."
  },
  {
    "id": "sys_microservices",
    "index": "07",
    "name": "Microservices & API Gateways",
    "overview": "Decomposing applications into specialized services managed by gateway routing boundaries.",
    "detailedTheory": "Microservice architectures partition applications into single-purpose services communicating via REST, gRPC, or messaging. An API Gateway acts as the single Entry Point, handling URL routing, auth tokens, SSL termination, and cross-cutting limits. Service Discovery registries (like Consul or Eureka) let services discover dynamic IP/Port assignments of other microservice instances.",
    "dryRun": "API Gateway routing flow:\\n1. Client calls API Gateway /orders.\\n2. Gateway validates OAuth Token.\\n3. Queries Service Discovery for active 'orders-service' instances.\\n4. Routes request to Instance 10.0.1.25:8080.",
    "visualTrace": "Client ──> [API Gateway] ══╦══> [Auth Service]\\n                           ╠══> [Orders Service]\\n                           ╚══> [Inventory Service]",
    "code": {
      "java": "// Java Spring Cloud Gateway routing rules definition class\\n// @Bean\\n// public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {\\n//     return builder.routes().route(\"path_route\", r -> r.path(\"/orders/**\").uri(\"http://orders-srv\")).build();\\n// }",
      "cpp": "// C++ gateway routing rule map representation\\n#include <map>\\n#include <string>\\nconst std::map<std::string, std::string> GATEWAY_ROUTES = { {\"/orders\", \"http://orders-service:8080\"} };",
      "python": "# Python FastAPI API Gateway routing simulation\\nimport httpx\\nasync def route_gateway(request, path):\\n    async with httpx.AsyncClient() as client:\\n        resp = await client.get(f\"http://orders-service:8080/{path}\")\\n        return resp.json()",
      "js": "// Express gateway proxy router stub"
    },
    "interviewQ": "What is the role of Service Discovery in microservices?",
    "interviewA": "In microservices, instances spin up or down dynamically, with arbitrary IPs and ports. Hardcoding endpoints is impossible. Service Discovery acts as a live registry where instances check in upon starting. Other services query this registry to dynamically discover service locations."
  },
  {
    "id": "sys_design_patterns",
    "index": "08",
    "name": "Rate Limiting & Circuit Breakers",
    "overview": "Self-preservation mechanisms defending microservices from traffic surges and cascading dependencies failure.",
    "detailedTheory": "Rate Limiting restricts user/IP request counts within a window using algorithms like Token Bucket, Leaky Bucket, or Sliding Window Log. Circuit Breakers wrap service calls. If failure ratios exceed threshold limits, the circuit opens (trips), immediately returning backup fallback responses. It transitions to half-open state periodically to check if the downstream service has recovered.",
    "dryRun": "Token Bucket processing:\\n1. Bucket capacity: 10, refill rate: 2 tokens/sec.\\n2. Client sends 12 requests instantly.\\n3. 10 requests consume 10 tokens -> Allowed.\\n4. Last 2 requests experience token deficit -> Rejected (HTTP 429).",
    "visualTrace": "Service A ──> [Circuit Breaker (Closed: All OK / Open: Fast Fallback)] ──> Service B",
    "code": {
      "java": "// Java Rate Limiter implementing Token Bucket (Resilience4j)\\n// RateLimiterConfig config = RateLimiterConfig.custom().limitForPeriod(10).limitRefreshPeriod(Duration.ofSeconds(1)).build();",
      "cpp": "// C++ circuit breaker state controller representation\\nenum CB_State { CLOSED, OPEN, HALF_OPEN };",
      "python": "# Python Token Bucket rate limiting algorithm\\nimport time\\nclass TokenBucket:\\n    def __init__(self, capacity, fill_rate):\\n        self.capacity, self.fill_rate = capacity, fill_rate\\n        self.tokens, self.last_time = capacity, time.time()\\n    def allow_request(self):\\n        now = time.time()\\n        self.tokens = min(self.capacity, self.tokens + (now - self.last_time) * self.fill_rate)\\n        self.last_time = now\\n        if self.tokens >= 1:\\n            self.tokens -= 1; return True\\n        return False",
      "js": "// Express rate limiter middleware stub"
    },
    "interviewQ": "Describe the three states of a Circuit Breaker.",
    "interviewA": "1. Closed: Operations flow normally; failures are monitored. 2. Open: Failures exceed threshold; calls are blocked instantly, returning fallback errors. 3. Half-Open: After a timeout, trial requests are sent to check if the service recovered. If successful, the circuit closes; if failures occur, it opens again."
  },
  {
    "id": "sys_databases_sql_nosql",
    "index": "09",
    "name": "SQL vs NoSQL Databases",
    "overview": "Understanding storage paradigms, relational indexing, document models, wide-column keys, and ACID vs BASE properties.",
    "detailedTheory": "SQL databases (MySQL, PostgreSQL) enforce schema rules, normalize tables to prevent redundancy, and guarantee ACID consistency (Atomicity, Consistency, Isolation, Durability). They scale vertically. NoSQL databases bypass rigid schemas, normalization, and relational joins for high write scale, horizontal partitioning, and BASE consistency (Basically Available, Soft state, Eventual consistency). Models include Key-Value (Redis), Document (MongoDB), Wide-Column (Cassandra), and Graph (Neo4j).",
    "dryRun": "Comparing reads on highly joined data:\n1. SQL: SELECT * FROM users JOIN orders JOIN payments -> Performs nested loop index joins across 3 tables.\n2. NoSQL: db.users.find({_id: 101}) -> Fetches a single pre-aggregated JSON document containing orders and payments inside nested arrays instantly.",
    "visualTrace": "SQL Model: [User Table] --(1:M)--> [Orders Table] --(1:1)--> [Payment Table]\nNoSQL Model: { _id: 101, name: 'Alice', orders: [ { order_id: 201, payment: { amount: 50.0 } } ] }",
    "code": {
      "java": "// Java Spring configuration for MongoDB document repository mapping\n// @Document(collection = 'users')\n// public class User { @Id private String id; private List<Order> orders; }",
      "cpp": "// C++ database storage engine type representations\nenum DbType { RELATIONAL_SQL, DOCUMENT_NOSQL, WIDE_COLUMN, KEY_VALUE };",
      "python": "# Python pymongo insert snippet demonstrating schema-less document structure\nfrom pymongo import MongoClient\nclient = MongoClient('mongodb://localhost:27017/')\ndb = client.shop_db\ndb.users.insert_one({\n    'username': 'alice123',\n    'address': {'city': 'NYC', 'zip': 10001},\n    'payment_methods': [{'card_type': 'Visa', 'last4': '4321'}]\n})",
      "js": "// Node.js database mapping wrapper"
    },
    "interviewQ": "What are ACID and BASE properties, and how do they differ?",
    "interviewA": "ACID properties (Atomicity, Consistency, Isolation, Durability) prioritize strict consistency: transactions are atomic, isolate other queries, and persist permanently, making SQL ideal for financial ledgers. BASE properties (Basically Available, Soft state, Eventual consistency) prioritize availability and horizontal scaling: the database states can drift temporarily across replicas (soft state) but will merge to match eventually."
  },
  {
    "id": "sys_replication_models",
    "index": "10",
    "name": "Database Replication & Consensus",
    "overview": "Scaling database throughput using master-slave replication and Raft/Paxos consensus protocols.",
    "detailedTheory": "Replication copies data across multiple database instances to provide redundancy and read scaling. Single-Leader (Master-Slave) routes writes to the leader and replicates to followers synchronously or asynchronously (introducing replication lag). Multi-Leader and Leaderless allow writes to multiple nodes, relying on Quorum Reads/Writes (W + R > N) to guarantee consistency. Consensus protocols like Raft and Paxos ensure a cluster of nodes agrees on a shared transaction log, electing leaders via majority votes.",
    "dryRun": "Raft Leader Election step:\n1. Leader Node crashes.\n2. Follower Node A times out, increments term counter, and transitions to Candidate.\n3. Candidate A sends RequestVote RPCs to Nodes B and C.\n4. Nodes B and C reply success (granting vote) if Candidate's log is up-to-date.\n5. Candidate A receives 3/3 votes (majority) -> transitions to Leader.",
    "visualTrace": "Normal State: [Leader] ==(Replicate Log)==> [Follower 1] & [Follower 2]\nNetwork Split: [Leader, Follower 1] (No Quorum) vs [Candidate, Follower 2, Follower 3] (Majority Quorum elects new Leader)",
    "code": {
      "java": "// Java Spring cluster candidate properties\npublic class RaftNode {\n    private NodeState state = NodeState.FOLLOWER;\n    private int currentTerm = 0;\n    private String votedFor = null;\n}",
      "cpp": "// C++ database replication mode headers\nenum ReplicationMode { SYNCHRONOUS, ASYNCHRONOUS, SEMI_SYNCHRONOUS };",
      "python": "# Python simulation of read-your-own-writes consistency routing\ndef get_database_connection(user_id, last_write_timestamp):\n    import time\n    # Route to Master if user updated database within last 5 seconds to bypass replica lag\n    if time.time() - last_write_timestamp < 5:\n        return 'MASTER_CONN_IP'\n    return 'REPLICA_SLAVE_IP'",
      "js": "// Node.js replica pool route mapper"
    },
    "interviewQ": "What is the split-brain scenario in database replication, and how is it prevented?",
    "interviewA": "Split-brain occurs when a network partition divides a cluster, and both subgroups elect a leader. Both leaders then accept writes, creating diverging data logs. It is prevented by requiring a majority quorum (e.g. at least ceil((N+1)/2) nodes) to elect a leader or commit any write. The partition containing the minority group cannot achieve quorum, and drops to read-only mode."
  },
  {
    "id": "sys_communication_protocols",
    "index": "11",
    "name": "Communication Protocols (gRPC, WebSockets, SSE)",
    "overview": "Comparing HTTP/1.x, HTTP/2, HTTP/3, WebSockets, Long Polling, and Server-Sent Events for client-server transfers.",
    "detailedTheory": "HTTP/1.1 uses persistent TCP connections but suffers from Head-of-Line (HoL) blocking on concurrent requests. HTTP/2 introduces binary framing and Multiplexing (streams map concurrently over one TCP connection) and HPACK header compression. HTTP/3 replaces TCP with QUIC over UDP, resolving packet-level HoL blocking. WebSockets provide full-duplex persistent connections. Server-Sent Events (SSE) provide unidirectional server-to-client updates over standard HTTP.",
    "dryRun": "HTTP/2 Multiplexing flow:\n1. Browser initiates single TCP connection.\n2. Page requests style.css, script.js, logo.png.\n3. Browser chunks them into binary frames (Stream 1, Stream 3, Stream 5).\n4. Sends frames interleaved over TCP.\n5. Server decodes frames and processes resources in parallel.",
    "visualTrace": "HTTP/1.1: [Request 1] -> [Response 1] -> [Request 2] (Blocking Queue)\nHTTP/2:   [TCP Connection] === (Frame 1, Stream 3, Frame 2, Stream 1) ===> (Multiplexed Parallel)",
    "code": {
      "java": "// Java gRPC Protocol Buffer service definition mapping stub\n/*\nservice OrderService {\n    rpc CreateOrder (OrderRequest) returns (OrderResponse);\n}\n*/",
      "cpp": "// C++ protocol connection types\nenum ProtocolType { HTTP_1_1, HTTP_2, HTTP_3, WEBSOCKETS, SSE };",
      "python": "# Python script creating a simple WebSocket echo server using asyncio\n# import asyncio\n# import websockets\n# async def echo(websocket, path):\n#     async for message in websocket:\n#         await websocket.send(f'Echo: {message}')",
      "js": "// Node.js event source streaming route"
    },
    "interviewQ": "How does HTTP/2 multiplexing work, and how does HTTP/3 improve it further?",
    "interviewA": "HTTP/2 splits requests into independent binary frames and multiplexes them over a single TCP connection. However, if a single TCP packet is lost, the entire connection is blocked while TCP retransmits it (packet-level Head-of-Line blocking). HTTP/3 replaces TCP with QUIC over UDP. In QUIC, streams are independent at the transport layer, so a dropped packet only blocks its specific stream, leaving other streams unaffected."
  },
  {
    "id": "sys_distributed_transactions",
    "index": "12",
    "name": "Distributed Transactions & Saga Pattern",
    "overview": "Handling atomic workflows across multiple isolated microservices without global locks.",
    "detailedTheory": "Traditional Two-Phase Commit (2PC) guarantees consistency but is blocking and slows down under scale. In microservices, the Saga Pattern manages transactions through a sequence of local transactions. If a step fails, the Saga Orchestrator (centralized) or Choreographer (event-driven) issues compensating transactions in reverse order to undo the committed changes.",
    "dryRun": "Orchestration-based Saga flow on checkout failure:\n1. Orchestrator calls OrderService -> Creates Order [Success].\n2. Orchestrator calls PaymentService -> Processes payment [Success].\n3. Orchestrator calls InventoryService -> Out of stock [Failure!].\n4. Orchestrator triggers compensating action: RefundPayment in PaymentService.\n5. Orchestrator triggers compensating action: CancelOrder in OrderService.",
    "visualTrace": "Forward Path:  [Order Srv] --(Commit)--> [Payment Srv] --(Commit)--> [Inventory Srv (Fail)]\nRollback Path: [Order Srv] <--(Refund)-- [Payment Srv] <--(Compensate) ════╝",
    "code": {
      "java": "// Java Saga orchestration transaction state flow wrapper class\npublic class SagaCoordinator {\n    private List<SagaStep> steps = new ArrayList<>();\n    public void execute() {\n        for (SagaStep step : steps) {\n            if (!step.forward()) { rollback(); break; }\n        }\n    }\n}",
      "cpp": "// C++ Saga transaction step status\nenum SagaStatus { PENDING, COMMITTED, COMPENSATED, FAILED };",
      "python": "# Python microservice endpoint dispatching event for Choreographed Saga\ndef complete_checkout(order_id, user_id, amount):\n    db.orders.update(order_id, status='PENDING')\n    event_broker.publish('OrderCreatedEvent', {\n        'order_id': order_id,\n        'user_id': user_id,\n        'amount': amount\n    }) # Downstream payment and inventory will listen and respond",
      "js": "// Node.js Saga response validator"
    },
    "interviewQ": "What is the difference between Orchestration-based Saga and Choreography-based Saga?",
    "interviewA": "Orchestration-based Saga uses a centralized coordinator (orchestrator) that acts as the brain, explicitly calling each microservice and handling compensating rollbacks on failures. Choreography-based Saga is decentralized: services publish events, and other services subscribe to those events to execute their steps independently, creating a loose-coupling design at the cost of higher complexity in tracing state flow."
  }

];

const SystemDesignTheory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const [copiedExample, setCopiedExample] = useState(false);
  const [activeLang, setActiveLang] = useState('python'); // Python default
  const [selectedConceptId, setSelectedConceptId] = useState(() => {
    const fromUrl = searchParams.get('concept');
    if (fromUrl && systemDesignConcepts.some(c => c.id === fromUrl)) {
      return fromUrl;
    }
    return 'sys_scaling';
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
    const saved = localStorage.getItem('completed_sys_concepts');
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
    localStorage.setItem('completed_sys_concepts', JSON.stringify(newCompleted));
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

  const selectedConcept = systemDesignConcepts.find(c => c.id === selectedConceptId) || systemDesignConcepts[0];

  return (
    <div className="page-shell" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navbar />

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 40px' }}>
        
        {/* Back Link */}
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

        {/* Dark Blue Header Banner Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderRadius: '24px',
          padding: '40px',
          color: '#ffffff',
          marginBottom: '32px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '16px', letterSpacing: '0.3px' }}>
            <Cpu className="size-3.5 text-purple-400" />
            SYSTEM DESIGN MASTERCLASS · Scalable Architectures Syllabus
          </div>
          
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 10px 0', fontFamily: 'Sora, sans-serif', letterSpacing: '-0.5px' }}>
            System Design & Architecture Notes
          </h1>
          
          <p style={{ margin: 0, fontSize: '0.94rem', color: '#94a3b8', lineHeight: '1.6', maxWidth: '800px' }}>
            Master horizontal vs vertical scaling, load balancing algorithms, content delivery networks (CDNs), database sharding and consistent hashing, CAP & PACELC theorems, message broker event streams, microservices gateways, rate limiters, circuit breakers, SQL vs NoSQL models, database replication, and Saga distributed transactions.
          </p>
        </div>

        {/* Content Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT PANEL: Concept list */}
          <aside style={{ background: '#ffffff', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', position: 'sticky', top: '100px', maxHeight: 'calc(100vh - 150px)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>System Design</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
              {systemDesignConcepts.map((concept) => {
                const isActive = concept.id === selectedConceptId;
                const isDone = completedConcepts.includes(concept.id);

                return (
                  <div
                    key={concept.id}
                    onClick={() => setSelectedConceptId(concept.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: isActive ? '#10b981' : '#e2e8f0',
                      background: isActive ? 'linear-gradient(to right, #ecfdf5, #f0fdf4)' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.06)' : '0 1px 3px rgba(0,0,0,0.01)',
                      transition: 'all 0.2s',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = '#a7f3d0';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div 
                      onClick={(e) => toggleConceptCompleted(concept.id, e)}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '6px',
                        border: isDone ? '2px solid #10b981' : '2px solid #cbd5e1',
                        background: isDone ? '#10b981' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        transition: 'all 0.2s',
                        flexShrink: 0
                      }}
                    >
                      {isDone && <Check className="size-3 text-white" style={{ strokeWidth: 3 }} />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                      <span style={{ fontSize: '0.74rem', color: isActive ? '#10b981' : '#94a3b8', fontWeight: 700 }}>
                        Concept {concept.index}
                      </span>
                      <strong style={{
                        fontSize: '0.84rem',
                        color: isActive ? '#15803d' : '#475569',
                        lineHeight: '1.3',
                        marginTop: '2px',
                        wordBreak: 'break-word'
                      }}>
                        {concept.name}
                      </strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* RIGHT PANEL: Topic details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            
            {/* Overview Section */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', background: '#ecfdf5', padding: '4px 10px', borderRadius: '6px', textTransform: 'uppercase' }}>
                  Concept {selectedConcept.index}
                </span>
                <button
                  onClick={(e) => toggleConceptCompleted(selectedConcept.id, e)}
                  style={{
                    border: 'none',
                    background: completedConcepts.includes(selectedConcept.id) ? '#ecfdf5' : '#f1f5f9',
                    color: completedConcepts.includes(selectedConcept.id) ? '#15803d' : '#475569',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                >
                  {completedConcepts.includes(selectedConcept.id) ? (
                    <>Completed <Check className="size-4" /></>
                  ) : (
                    'Mark as Completed'
                  )}
                </button>
              </div>

              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', margin: '0 0 16px 0', fontFamily: 'Sora, sans-serif' }}>
                {selectedConcept.name}
              </h2>
              
              <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: '1.6', fontWeight: 700, margin: '0 0 24px 0' }}>
                {selectedConcept.overview}
              </p>

              <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '20px', margin: '24px 0' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>Detailed Theory Analysis</h4>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.7', margin: 0 }}>
                  {selectedConcept.detailedTheory}
                </p>
              </div>
            </section>

            {/* Language Code Editor / Template */}
            <section style={{ background: '#0f172a', borderRadius: '24px', overflow: 'hidden', border: '1px solid #1e293b', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
              <div style={{ background: '#1e293b', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Terminal className="size-4.5 text-indigo-400" />
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#94a3b8', fontFamily: 'monospace' }}>Code implementation / Configs</span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', gap: '4px', background: '#0f172a', padding: '3px', borderRadius: '8px' }}>
                    {['java', 'cpp', 'python', 'js'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLang(lang)}
                        style={{
                          border: 'none',
                          background: activeLang === lang ? '#1e293b' : 'transparent',
                          color: activeLang === lang ? '#ffffff' : '#64748b',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          transition: 'all 0.15s'
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleCopy(selectedConcept.code[activeLang], 'template')}
                    style={{
                      border: 'none',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      width: '28px', height: '28px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    {copiedTemplate ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                  </button>
                </div>
              </div>

              <pre style={{ margin: 0, padding: '24px', overflowX: 'auto', maxHeight: '400px' }}>
                <code style={{ fontFamily: 'monospace, Courier New', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: '1.6' }}>
                  {selectedConcept.code[activeLang]}
                </code>
              </pre>
            </section>

            {/* Execution Trace & Dry Run */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                  <Sparkles className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Visual Execution Trace</h3>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 8px 0' }}>Step-by-step Dry Run</h4>
                <p style={{ fontSize: '0.86rem', color: '#475569', lineHeight: '1.5', margin: 0 }}>
                  {selectedConcept.dryRun}
                </p>
              </div>

              {selectedConcept.visualTrace && (
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e293b', margin: '0 0 10px 0' }}>Flow & Mapping Diagram</h4>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e293b', background: '#0f172a' }}>
                    <div style={{ background: '#1e293b', height: '36px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                      <span style={{ color: '#64748b', fontSize: '0.74rem', fontFamily: 'monospace', marginLeft: '12px' }}>architecture_diagram.ascii</span>
                    </div>
                    <pre style={{
                      margin: 0,
                      padding: '20px',
                      color: '#38bdf8',
                      fontSize: '0.86rem',
                      fontFamily: 'monospace, Courier New',
                      overflowX: 'auto',
                      lineHeight: '1.5',
                      background: 'transparent'
                    }}>
                      <code>{selectedConcept.visualTrace}</code>
                    </pre>
                  </div>
                </div>
              )}
            </section>

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

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                          {q.options.map((opt) => {
                            const isCorrect = opt === q.answer;
                            const isSelected = opt === selectedAns;
                            
                            let buttonBg = '#ffffff';
                            let buttonBorder = '1px solid #cbd5e1';
                            let buttonColor = '#334155';

                            if (isAnswered) {
                              if (isCorrect) {
                                buttonBg = '#d1fae5';
                                buttonBorder = '1px solid #10b981';
                                buttonColor = '#065f46';
                              } else if (isSelected) {
                                buttonBg = '#fee2e2';
                                buttonBorder = '1px solid #ef4444';
                                buttonColor = '#991b1b';
                              } else {
                                buttonBg = '#f8fafc';
                                buttonBorder = '1px solid #e2e8f0';
                                buttonColor = '#94a3b8';
                              }
                            }

                            return (
                              <button
                                key={opt}
                                disabled={isAnswered}
                                onClick={() => handleSelectMCQ(q.id, opt)}
                                style={{
                                  padding: '14px 20px',
                                  borderRadius: '12px',
                                  background: buttonBg,
                                  border: buttonBorder,
                                  color: buttonColor,
                                  fontSize: '0.84rem',
                                  fontWeight: 600,
                                  cursor: isAnswered ? 'default' : 'pointer',
                                  textAlign: 'left',
                                  transition: 'all 0.2s',
                                }}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {showExp && (
                          <div style={{ background: '#f0fdf4', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid #10b981', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 800, color: '#166534' }}>
                              <CheckCircle2 className="size-4" /> Explanation (Answer: {q.answer})
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#166534', margin: 0, lineHeight: '1.5' }}>
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Interview Q&A Section */}
            <section style={{ background: '#ffffff', padding: '32px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'grid', placeItems: 'center' }}>
                  <Award className="size-5" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>High-Yield Interview QA</h3>
              </div>

              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', fontSize: '0.94rem', color: '#0f172a', marginBottom: '10px' }}>
                  Q: {selectedConcept.interviewQ}
                </strong>
                <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>
                  <strong>A:</strong> {selectedConcept.interviewA}
                </p>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SystemDesignTheory;
