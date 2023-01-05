# frontend
skeleton  

# dotenv
  
NODE_ENV=production  
BASE_URL='/'  
VUE_APP_SERVER=http://localhost:3001  

# docker-compose.yml
  
version: '1.3'  
services:  
  app:  #불러온 이미지 기반으로 컨테이너에 올리기 위해 새로 빌드 하게 될 이미지 이름  
    build:   # 불러올 이미지 & 기반으로 빌드  
      context: ./  
      dockerfile: ./Dockerfile  
    container_name: frontend   # 올릴 컨테이너 이름  
    ports:                     # 로컬과 연결할 포트 번호  
      - "443:443"              # nginx 암호화 프로토콜  
      - "80:80"              # 8080은 로컬에, 80은 컨테이너에 연결되는 포트번호를 말한다.  
    environment:  
      NODE_ENV: production     # .env 환경에서 설정해준 내용들  
      BASE_URL: '/'  
      VUE_APP_SERVER: http://192.168.0.106:3001  

# nginx-default.conf 
  
server_tokens off;  
  
server {  
    listen 80;  
  
    server_name camap.kr www.camap.kr;  
  
    root /home/www/dist;  
  
    return 301 https://camap.kr$request_uri;  
}  
  
server {  
    listen 443 ssl;  
  
    server_name camap.kr www.camap.kr;  
  
    ssl_certificate /etc/nginx/conf.d/camap.kr/fullchain1.pem;  
    ssl_certificate_key /etc/nginx/conf.d/camap.kr/privkey1.pem;  
  
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;  
  
    ssl_session_cache shared:SSL:40m;  
    ssl_session_timeout 4h;  
  
    root /home/www/dist;  
  
    location / {  
        try_files $uri $uri/ /index.html;  
    }  
    location /serverApi/ {  
        proxy_pass http://3.39.161.71:3001/;  
        proxy_set_header   X-Forwarded-Proto $scheme;  
        proxy_set_header   X-Real-IP         $remote_addr;  
    }  
}  
