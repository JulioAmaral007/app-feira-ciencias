# Directory to save QR code images
# const projectIds = [
#   'proj001',
#   'proj002', 
#   'proj003',
#   'proj004',
#   'proj005'
# ];

import qrcode
import os

# IDs dos projetos do arquivo projetos.json
projectIds = [
  'proj001',
  'proj002', 
  'proj003',
  'proj004',
  'proj005'
]

# Directory to save QR code images
output_dir = "qr_codes"
os.makedirs(output_dir, exist_ok=True)

# Generate QR codes for each project
for project_id in projectIds:
    # Create QR code
    qr = qrcode.QRCode(
        version=1,  # Controls the size of the QR Code, from 1 to 40
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(project_id)
    qr.make(fit=True)
    
    # Create an image of the QR code
    img = qr.make_image(fill="black", back_color="white")
    
    # Save the image as a PNG file
    img.save(os.path.join(output_dir, f"qr_code_{project_id}.png"))
    print(f"Saved QR code for {project_id}")

print(f"All QR codes saved in {output_dir}/")