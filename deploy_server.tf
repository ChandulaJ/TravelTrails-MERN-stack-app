
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "TravelTrails-ec2" {
  ami           = "ami-04b70fa74e45c3917"
  instance_type = "t2.small"
  key_name      = "deploy-server-key"
  vpc_security_group_ids = ["sg-08d9dd0b50b76f3a0"]

  tags = {
    Name = "TravelTrails-DeployServer"
  }
}

resource "aws_eip_association" "TravelTrails-eip_assoc" {
  instance_id   = aws_instance.TravelTrails-ec2.id
  allocation_id = "eipalloc-0249d6092bf4d4079"
}

