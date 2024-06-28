provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "my-ec2" {
  ami           = "ami-04b70fa74e45c3917"
  instance_type = "t2.medium"
  key_name      = "traveltrails-deploy-server"
  vpc_security_group_ids = ["sg-08d9dd0b50b76f3a0"]

  tags = {
    Name = "DeployServer"
  }
}

resource "aws_eip" "TravelTrails-deploy-server-eip" {
  instance = aws_instance.my-ec2.id
  vpc      = true
}

resource "aws_eip_association" "TravelTrails-deploy-server-eip" {
  instance_id   = aws_instance.my-ec2.id
  allocation_id = aws_eip.TravelTrails-deploy-server-eip.id
}

output "instance_ip" {
  value = aws_instance.my-ec2.public_ip
}
