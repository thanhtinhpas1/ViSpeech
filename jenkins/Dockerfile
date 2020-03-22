FROM jenkinsci/blueocean
USER jenkins
RUN sudo usermod -a -G docker jenkins
ENV JENKINS_OPTS --httpsPort=-1 --httpPort=8083
VOLUME /var/run/docker.sock /var/run/docker.sock
EXPOSE 8083
