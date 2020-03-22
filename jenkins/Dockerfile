FROM jenkins

COPY https.pem /var/lib/jenkins/cert
COPY https.key /var/lib/jenkins/pk
ENV JENKINS_OPTS --httpsPort=-1 --httpPort=8083
EXPOSE 8083