pipeline {
    agent any
    
    stages {
        stage('1. Build') {
            steps {
                echo 'Building Telemedicine Docker Image...'
                sh 'docker-compose build'
            }
        }
        
        stage('2. Test') {
            steps {
                echo 'Running Jest Unit Tests...'
                dir('backend') {
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        
        stage('3. Code Quality') {
            steps {
                echo 'Running SonarQube/Linting Checks...'
                dir('backend') {
                    // Running a mock linter for the pipeline demo
                    sh 'npm run lint' 
                }
            }
        }
        
        stage('4. Security') {
            steps {
                echo 'Running Dependency Vulnerability Scan...'
                dir('backend') {
                    // Scans for known CVEs in node modules
                    sh 'npm audit --audit-level=high || true' 
                }
            }
        }
        
        stage('5. Deploy') {
            steps {
                echo 'Deploying to Staging Environment via Docker...'
                sh 'docker-compose up -d'
            }
        }
        
        stage('6. Release') {
            steps {
                echo 'Tagging Version 1.0.0 for Production...'
                // Mocking AWS CodeDeploy/Git Tagging for the demo
                sh 'echo "Release v1.0.0 successfully packaged and tagged."'
            }
        }
        
        stage('7. Monitoring') {
            steps {
                echo 'Pinging Datadog/Prometheus Health Endpoints...'
                // Wait for the Docker container to boot
                sh 'sleep 10' 
                // Ping the server. If it fails, the pipeline fails.
                sh 'curl -f http://localhost:5000/health || exit 1'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished. Cleaning up environment...'
            sh 'docker-compose down'
        }
    }
}
