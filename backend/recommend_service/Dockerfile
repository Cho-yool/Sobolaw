# 패키지 스테이지
FROM python:3.8

RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    apt-get clean;
ENV JAVA_HOME /usr/lib/jvm/java-17-openjdk-amd64

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8004
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8004"]
