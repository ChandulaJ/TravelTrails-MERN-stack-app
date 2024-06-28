provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "my-ec2" {
  ami           = "ami-0e001c9271cf7f3b9"
  instance_type = "t2.medium"
  key_name      = "traveltrails-deploy-server"
  vpc_security_group_ids = ["sg-08d9dd0b50b76f3a0"]

  tags = {
    Name = "DeployServer"
  }
}

resource "aws_eip" "my_eip" {
  instance = aws_instance.my-ec2.id
  vpc      = true
  allocation_id = "eipalloc-03a066f8fdd51aaf6"
}

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.my-ec2.id
  allocation_id = aws_eip.my_eip.id
}

output "instance_ip" {
  value = aws_eip.my_eip.public_ip
}
