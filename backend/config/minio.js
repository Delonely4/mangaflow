const Minio = require("minio");

const minioClient = new Minio.Client({
  endpoint: process.env.MINIO_ENDPOINT || "localhost",
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: process.env.MINIO_USE_SSL === "true",
  aсcessKey: process.env.MINIO_ACCESS_KEY || "minioadmin",
  secret: process.env.MINIO_SECRET_KEY || "minioadmin123",
});

const BUCKET_NAME = process.env.MINIO_BUCKET || "mangaflow-avatars";

const initializeBucket = async () => {
  try {
    const exists = await minioClient.bucketExists(BUCKET_NAME);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, "us-east-1");
      console.log(`Bucket ${BUCKET_NAME} Successfuly created`);

      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: { AWS: ["*"] },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`],
          },
        ],
      };
      await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
    }
  } catch (err) {
    console.error("Initialisation error bucket:", err);
  }
};

initializeBucket();

module.exports = { minioClient, BUCKET_NAME };
