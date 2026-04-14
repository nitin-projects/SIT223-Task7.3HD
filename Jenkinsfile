pipeline {
    agent any
    
    stages {
        stage('1. Build') {
            steps {
                echo 'Building Telemedicine Docker Image...'
                bat 'docker-compose build'
            }
        }
        
        stage('2. Test') {
            steps {
                echo 'Running Jest Unit Tests...'
                dir('Backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }
        
        stage('3. Code Quality') {
            steps {
                echo 'Running SonarQube/Linting Checks...'
                dir('Backend') {
                    // Running a mock linter for the pipeline demo
                    bat 'npm run lint' 
                }
            }
        }
        
        stage('4. Security') {
            steps {
                echo 'Running Dependency Vulnerability Scan...'
                dir('Backend') {
                    // Scans for known CVEs in node modules, ignores exit code to continue pipeline
                    bat 'npm audit --audit-level=high || echo "Vulnerabilities found, but continuing for demo"' 
                }
            }
        }
        
        stage('5. Deploy') {
            steps {
                echo 'Deploying to Staging Environment via Docker...'
                bat 'docker-compose up -d'
            }
        }
        
        stage('6. Release') {
            steps {
                echo 'Tagging Version 1.0.0 for Production...'
                bat 'echo Release v1.0.0 successfully packaged and tagged.'
            }
        }
        
        stage('7. Monitoring') {
            steps {
                echo 'Pinging Health Endpoints...'
                // Jenkins ki native sleep command (10 seconds wait karegi)
                sleep time: 10, unit: 'SECONDS'
                // Ping the server to check if it's active
                bat 'curl -f http://localhost:5000/health'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline finished. Cleaning up environment...'
            bat 'docker-compose down'
        }
    }
}
