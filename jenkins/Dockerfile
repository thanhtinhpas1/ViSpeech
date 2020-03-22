FROM jenkinsci/blueocean
RUN addgroup -r jenkins \
 && adduser -r -g docker jenkins
ENV JENKINS_OPTS --httpsPort=-1 --httpPort=8083
VOLUME /var/run/docker.sock /var/run/docker.sock
USER jenkins
EXPOSE 8083
