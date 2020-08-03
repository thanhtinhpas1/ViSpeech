
# Based on Ubuntu
############################################################

# Set the base image to Ubuntu
FROM nginx

# File Author / Maintainer
MAINTAINER Maintaner Name

# Install Nginx

# Update the repository
RUN apt-get update

# Install necessary tools
RUN apt-get install -y nano wget dialog net-tools

# Download and Install Nginx
RUN apt-get install -y nginx

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file
ADD nginx.conf /etc/nginx
ADD private.key /etc/nginx/
ADD certificate.crt /etc/nginx/

# Append "daemon off;" to the beginning of the configuration
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80
# Set the default command to execute
# when creating a new container
CMD service nginx start