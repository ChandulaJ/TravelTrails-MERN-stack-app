pipeline {
    agent {
        label 'TRAVEL'
    }

    environment {
        GIT_REPO = 'https://github.com/ChandulaJ/TravelTrails-MERN-stack-app.git' 
      }

    stages {
		
		stage('Clean workspace') {
            steps {
                cleanWs()
            }
        }
		
        stage('Clone Repository with poll enabled') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }
		stage('Navigate to location of docker compose file') {
			steps { 
				sh 'cd /opt/jenkins-slave/workspace/TravelTrails/TravelTrails && ls -la'
			}
		}
		
		stage('Remove existing Docker Images') {
            steps {
                sh 'cd /opt/jenkins-slave/workspace/TravelTrails/TravelTrails && docker-compose down'
				sh 'sudo docker rmi mongo:4.4.25 traveltrails_frontend traveltrails_backend --force'
				sh 'sudo docker system prune -f'
            }
        }
		
        stage('Build Docker Images') {
            steps {
                sh 'cd /opt/jenkins-slave/workspace/TravelTrails/TravelTrails && docker-compose up --build -d'
            }
        }

    
    }

  
}
