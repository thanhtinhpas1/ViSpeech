FROM jenkinsci/blueocean
USER jenkins
ENV JENKINS_OPTS --httpsPort=-1 --httpPort=8083
VOLUME /var/run/docker.sock /var/run/docker.sock
EXPOSE 8083
