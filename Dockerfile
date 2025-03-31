FROM nginx:alpine

# Create non-root user
RUN adduser -D -H -u 1000 -s /sbin/nologin nginx-user

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files
COPY src/ /usr/share/nginx/html/

# Set proper permissions
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Switch to non-root user
USER nginx-user

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1
