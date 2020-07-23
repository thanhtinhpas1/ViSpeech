version: '3.7'
services:
  jenkins:
    image: jenkinsci/blueocean
    volumes:
      - home:/home
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /etc/timezone:/etc/timezone
      - /opt:/opt
    user: root:root
    ports:
      - ${CI_PORT:-8080}:8080
    healthcheck:
      test: ['CMD', 'wget', '--spider', 'http://localhost:8080/login']
volumes:
  home:
  jenkins_home: