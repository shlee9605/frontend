# frontend
skeleton  

# dotenv

NODE_ENV=production  
BASE_URL='/'  
VUE_APP_SERVER=http://localhost:3001  

# docker compose yml

version: '1.2'  
services:  
  app:  #불러온 이미지 기반으로 컨테이너에 올리기 위해 새로 빌드 하게 될 이미지 이름  
    build:   # 불러올 이미지 & 기반으로 빌드  
      context: ./  
      dockerfile: ./Dockerfile  
    container_name: frontend   # 올릴 컨테이너 이름  
    ports:                     # 로컬과 연결할 포트 번호  
      - "443:443"              # nginx 암호화 프로토콜  
      - "8080:80"              # 8080은 로컬에, 80은 컨테이너에 연결되는 포트번호를 말한다.  
    environment:  
      NODE_ENV: production     # .env 환경에서 설정해준 내용들  
      BASE_URL: '/'  
      VUE_APP_SERVER: http://localhost:3001  