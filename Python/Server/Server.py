import socketserver

class MyTCPRequestHandler(socketserver.StreamRequestHandler) :
	def handle(self) :
		data = self.rfile.readline().strip()
		print(data)
		self.wfile.write(data)

if __name__ == "__main__" :
	HOST, PORT = "localhost", 8000
	server = socketserver.TCPServer((HOST, PORT), MyTCPRequestHandler)
	ip, port = server.server_address
	print ("IP : %s" % ip)
	print ("PORT : %s" % port)
	server.serve_forever()