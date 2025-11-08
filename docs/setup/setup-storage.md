# File Storage Setup Guide

This guide covers setting up AWS S3 or Cloudflare R2 for file storage (profile images, uploads, etc.).

## What is File Storage?

File storage services like AWS S3 and Cloudflare R2 are cloud-based storage systems where you can store files (images, documents, videos, etc.) that your application needs. Instead of storing files on your server, you store them in the cloud, which is more scalable and reliable.

## Purpose

File storage enables your SaaS application to:

- Store user-uploaded files (profile pictures, documents)
- Serve images and media files efficiently
- Scale storage as your application grows
- Reduce server load by offloading file storage
- Provide fast file access from anywhere
- Handle large files without impacting your server

## Uses in This Boilerplate

In this boilerplate, file storage is used for:

- **Profile Images**: Store user profile pictures and avatars
- **File Uploads**: Handle user-uploaded files securely
- **Media Storage**: Store images and other media files
- **Signed URLs**: Generate secure, temporary links for file access
- **Scalable Storage**: Handle growing amounts of user files

## Option 1: Cloudflare R2 (Recommended)

R2 is S3-compatible and offers free egress (no bandwidth charges).

## Step 1: Create Cloudflare Account

1. Go to [Cloudflare](https://www.cloudflare.com/)
2. Sign up for free account
3. Verify your email

## Step 2: Create R2 Bucket

1. Go to **R2** in Cloudflare dashboard
2. Click **Create bucket**
3. Name your bucket (e.g., `saasbold-uploads`)
4. Choose a location
5. Create bucket

## Step 3: Get API Credentials

1. Go to **Manage R2 API Tokens**
2. Click **Create API Token**
3. Set permissions:
   - **Object Read & Write**
4. Copy:
   - **Access Key ID**
   - **Secret Access Key**
   - **Account ID** (found in R2 dashboard URL)

## Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID="your-account-id"
R2_ACCESS_KEY_ID="your-access-key-id"
R2_SECRET_ACCESS_KEY="your-secret-access-key"
R2_BUCKET_NAME="saasbold-uploads"
```

## Option 2: AWS S3

## Step 1: Create AWS Account

1. Go to [AWS](https://aws.amazon.com/)
2. Sign up for account
3. Complete verification

## Step 2: Create S3 Bucket

1. Go to **S3** in AWS Console
2. Click **Create bucket**
3. Configure:
   - Bucket name (globally unique)
   - Region
   - Block public access (set as needed)
4. Create bucket

## Step 3: Create IAM User

1. Go to **IAM** → **Users**
2. Click **Create user**
3. Name: `saasbold-s3-user`
4. Attach policy: `AmazonS3FullAccess` (or custom policy)
5. Create user
6. Go to **Security credentials** tab
7. Create access key
8. Copy:
   - **Access Key ID**
   - **Secret Access Key**

## Step 4: Configure Environment Variables

Add to your `.env` file:

```env
# AWS S3 Configuration
AWS_ACCESS_KEY_ID="your-access-key-id"
AWS_SECRET_ACCESS_KEY="your-secret-access-key"
AWS_REGION="us-east-1"  # Your bucket region
AWS_S3_BUCKET_NAME="your-bucket-name"
```

## Step 5: Update Code for AWS S3

If using AWS S3 instead of R2, update `src/actions/upload.ts`:

```typescript
import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region: process.env.AWS_REGION!,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
});
```

## Step 6: Configure CORS

### Cloudflare R2

1. Go to bucket settings
2. Add CORS policy:

```json
[
	{
		"AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
		"AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
		"AllowedHeaders": ["*"],
		"ExposeHeaders": ["ETag"],
		"MaxAgeSeconds": 3000
	}
]
```

### AWS S3

1. Go to bucket → **Permissions** → **CORS**
2. Add CORS configuration:

```json
[
	{
		"AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
		"AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
		"AllowedHeaders": ["*"],
		"ExposeHeaders": ["ETag"],
		"MaxAgeSeconds": 3000
	}
]
```

## Step 7: Test File Upload

1. Start development server: `pnpm dev`
2. Navigate to user profile settings
3. Upload a profile image
4. Verify file appears in bucket

## File Upload Features

The boilerplate includes:

- **Profile image upload** - User avatars
- **Signed URLs** - Secure, time-limited upload URLs
- **File validation** - Type and size checks
- **Automatic cleanup** - Old files replaced

## Configuration

### Accepted File Types

Edit `src/actions/upload.ts`:

```typescript
const acceptedTypes = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp", // Add more types
];
```

### File Size Limits

```typescript
const maxSize = 2000000; // 2MB in bytes
```

### URL Expiration

```typescript
const url = await getSignedUrl(
	s3Client,
	putObjectCommand,
	{ expiresIn: 60 } // 60 seconds
);
```

## Production Setup

### Environment Variables

```env
# Cloudflare R2 (Production)
R2_ACCOUNT_ID="your-production-account-id"
R2_ACCESS_KEY_ID="your-production-access-key"
R2_SECRET_ACCESS_KEY="your-production-secret-key"
R2_BUCKET_NAME="your-production-bucket"

# Or AWS S3 (Production)
AWS_ACCESS_KEY_ID="your-production-access-key"
AWS_SECRET_ACCESS_KEY="your-production-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET_NAME="your-production-bucket"
```

### Public Access

If files need public access:

**Cloudflare R2:**

1. Go to bucket settings
2. Enable **Public Access**
3. Set custom domain (optional)

**AWS S3:**

1. Go to bucket → **Permissions**
2. Edit **Block public access**
3. Uncheck blocks as needed
4. Add bucket policy for public read (if needed)

## Security Best Practices

1. **Use signed URLs** - Don't expose bucket credentials
2. **Validate file types** - Only accept safe file types
3. **Limit file sizes** - Prevent abuse
4. **Set expiration** - Signed URLs should expire
5. **Use IAM policies** - Restrict permissions to minimum needed
6. **Enable versioning** - For important files
7. **Enable logging** - Monitor access

## Troubleshooting

### "Access Denied" error

- Verify credentials are correct
- Check IAM user has correct permissions
- Verify bucket name is correct
- Check CORS configuration

### Files not uploading

- Check file size is within limit
- Verify file type is accepted
- Check signed URL hasn't expired
- Review bucket permissions

### CORS errors

- Verify CORS configuration includes your domain
- Check allowed methods include needed operations
- Ensure headers are allowed
- Clear browser cache

## Cost Considerations

### Cloudflare R2

- **Storage:** $0.015 per GB/month
- **Class A Operations:** $4.50 per million
- **Class B Operations:** $0.36 per million
- **Egress:** FREE (no bandwidth charges)

### AWS S3

- **Storage:** Varies by region (~$0.023 per GB/month)
- **Requests:** Varies by type
- **Egress:** Varies by region and amount

## Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/)
