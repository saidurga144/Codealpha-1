import { Packet } from './types';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomIP = () => `${randomInt(1, 254)}.${randomInt(1, 254)}.${randomInt(1, 254)}.${randomInt(1, 254)}`;
const randomPort = () => randomInt(1024, 65535);
const randomElement = <T,>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];

const protocols = ['TCP', 'UDP', 'ICMP', 'HTTP', 'DNS'];
const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
const httpPaths = ['/index.html', '/api/v1/users', '/login.php', '/img/logo.png', '/'];
const domains = ['google.com', 'example.com', 'github.com', 'cloudflare.com', 'api.service.net'];

let packetId = 0;

const formatPayload = (payload: string, len: number = 128) => {
    const truncatedPayload = payload.slice(0, len);
    const hex = Array.from(truncatedPayload, char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    const ascii = Array.from(truncatedPayload, char => (char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126) ? char : '.').join('');
    return { hex, ascii };
};


export const generateMockPacket = (): Packet => {
  const protocol = randomElement(protocols);
  const srcIp = randomIP();
  const dstIp = randomIP();
  let src = srcIp;
  let dst = dstIp;
  let summary = '';
  let payloadStr = '';

  switch (protocol) {
    case 'TCP':
    case 'UDP':
      const srcPort = randomPort();
      const dstPort = randomPort();
      src = `${srcIp}:${srcPort}`;
      dst = `${dstIp}:${dstPort}`;
      summary = `${protocol} ${src} > ${dst} Len: ${randomInt(20, 100)}`;
      payloadStr = `Random payload data for ${protocol} packet. Seq=${randomInt(1000,9999)} Ack=${randomInt(1000,9999)}`;
      break;
    case 'HTTP':
      const httpSrcPort = randomPort();
      const httpDstPort = 80;
      src = `${srcIp}:${httpSrcPort}`;
      dst = `${dstIp}:${httpDstPort}`;
      const method = randomElement(httpMethods);
      const path = randomElement(httpPaths);
      summary = `${method} ${path} HTTP/1.1`;
      payloadStr = `${summary}\r\nHost: ${randomElement(domains)}\r\nUser-Agent: Mockzilla/5.0\r\nAccept: */*\r\n`;
      break;
    case 'DNS':
      const dnsSrcPort = randomPort();
      const dnsDstPort = 53;
      src = `${srcIp}:${dnsSrcPort}`;
      dst = `${dstIp}:${dnsDstPort}`;
      const domain = randomElement(domains);
      summary = `Standard query 0x${Math.random().toString(16).substr(2, 4)} A ${domain}`;
      payloadStr = `DNS query for ${domain} of type A`;
      break;
    case 'ICMP':
      summary = `ICMP echo request id=0x${Math.random().toString(16).substr(2, 4)}, seq=${randomInt(1, 10)}, ttl=64`;
      payloadStr = `ICMP echo request payload data. Ping...`;
      break;
  }
  
  const length = randomInt(64, 1500);
  const { hex, ascii } = formatPayload(payloadStr);

  return {
    id: `pkt-${packetId++}`,
    timestamp: new Date().toISOString().split('T')[1].replace('Z',''),
    src,
    dst,
    protocol,
    length,
    summary,
    payload: { hex, ascii },
  };
};
