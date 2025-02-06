"use server"

import { BlobServiceClient, type ContainerClient } from '@azure/storage-blob';

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME!

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage Connection string not found")
}


const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
const containerClient: ContainerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME)

export async function uploadToBlob(file: File | Blob, fileName: string): Promise<string> {
  if (!file) {
    throw new Error("File is required")
  }

  const blobClient = containerClient.getBlockBlobClient(fileName)

  // Convert File/Blob to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer()

  await blobClient.uploadData(arrayBuffer)
  return blobClient.url
}

export async function deleteBlob(fileName: string): Promise<void> {
  const blobClient = containerClient.getBlockBlobClient(fileName)
  await blobClient.delete()
}

