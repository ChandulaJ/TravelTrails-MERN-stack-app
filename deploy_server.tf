provider "aws" {
    region = "us-east-1"

}

resource "aws_instance" "example" {
    ami = "ami-04b70fa74e45c3917"
    instance_type = "t2.micro"
    key_name = "deploy-server-key"
    security_groups = ["MyDeployServer-sg"]
    tags = {
        Name = "DeployServer"
    }
}
