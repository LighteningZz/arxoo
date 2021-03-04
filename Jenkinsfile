node {
  checkout scm
    stage("Build Images") {
      try {
        sh "docker build -t ${DOCKER_REGISTRY}/arxoo-next:${BUILD_NUMBER} ."
      } 
      catch(e) {
        error "Build Images failed"
      } 
    }
    stage("Run Container") {
      try {
        sh "env >> env.txt"
        sh "docker rm -f new-arxoo-next || true"
        sh "docker run -d --restart=always \
              --env-file ./env.txt \
              --name=new-arxoo-frontend --network ${NETWORK} \
              ${DOCKER_REGISTRY}/arxoo-next:${BUILD_NUMBER}"
      }
      catch(e) {
        error "Run Container failed"
      }
      finally {
        sh "docker rename arxoo-frontend old-arxoo-frontend || true"
        sh "docker rename new-arxoo-frontend arxoo-frontend || true"
        sh "docker rm -f old-arxoo-frontend || true"
      }
    }
}