
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Upload, X, File, Download, Eye, Trash } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ResumeUploadProps {
  maxFileSizeMB?: number;
  allowedFileTypes?: string[];
  onFileUpload?: (file: File) => void;
  existingFileUrl?: string;
  existingFileName?: string;
}

const ResumeUpload = ({
  maxFileSizeMB = 5,
  allowedFileTypes = ['.pdf', '.doc', '.docx'],
  onFileUpload,
  existingFileUrl,
  existingFileName,
}: ResumeUploadProps) => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate max file size in bytes
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxFileSizeBytes) {
      setUploadError(`File is too large. Maximum file size is ${maxFileSizeMB}MB.`);
      return false;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!allowedFileTypes.includes(fileExtension)) {
      setUploadError(`Invalid file type. Allowed types: ${allowedFileTypes.join(', ')}`);
      return false;
    }

    setUploadError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setFile(file);
      simulateUpload(file);
    }
  };

  // Simulate file upload with progress
  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Call the onFileUpload callback if provided
          if (onFileUpload) {
            onFileUpload(file);
          }
          
          toast({
            title: "Resume Uploaded",
            description: `${file.name} has been successfully uploaded.`,
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadError(null);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const previewFile = () => {
    if (file) {
      // Create object URL for the file
      const objectUrl = URL.createObjectURL(file);
      window.open(objectUrl, '_blank');
    } else if (existingFileUrl) {
      window.open(existingFileUrl, '_blank');
    }
  };

  const downloadFile = () => {
    if (file) {
      // Create a download link for the file
      const a = document.createElement('a');
      a.href = URL.createObjectURL(file);
      a.download = file.name;
      a.click();
    } else if (existingFileUrl && existingFileName) {
      // For existing file
      const a = document.createElement('a');
      a.href = existingFileUrl;
      a.download = existingFileName;
      a.click();
    }
  };

  // Get file icon based on extension
  const getFileIcon = () => {
    if (!file && !existingFileName) return <FileText className="h-10 w-10 text-gray-400" />;
    
    const fileName = file ? file.name : existingFileName || '';
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'pdf':
        return <File className="h-10 w-10 text-red-500" />;
      case 'doc':
      case 'docx':
        return <File className="h-10 w-10 text-blue-500" />;
      default:
        return <FileText className="h-10 w-10 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Resume / CV</CardTitle>
        <CardDescription>
          Upload your resume or CV in PDF, DOC, or DOCX format (max {maxFileSizeMB}MB)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* File is uploaded or exists */}
        {(file || existingFileUrl) && (
          <div className="mb-4">
            <div className="flex items-center p-4 border rounded-md bg-gray-50">
              <div className="mr-4">
                {getFileIcon()}
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-medium truncate">
                  {file ? file.name : existingFileName}
                </p>
                <p className="text-sm text-gray-500">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}
                </p>
                {isUploading && (
                  <div className="mt-2">
                    <Progress value={uploadProgress} className="h-1" />
                    <p className="text-xs text-gray-500 mt-1">
                      Uploading... {uploadProgress}%
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={previewFile}
                  disabled={isUploading}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={downloadFile}
                  disabled={isUploading}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={removeFile}
                  disabled={isUploading}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Upload area - only show if no file uploaded or error occurred */}
        {(!file && !existingFileUrl) || uploadError ? (
          <div 
            className={`border-2 border-dashed rounded-md p-6 text-center hover:bg-gray-50 transition-colors
              ${dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
              ${uploadError ? 'border-red-300 bg-red-50' : ''}
            `}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept={allowedFileTypes.join(',')}
              onChange={handleChange}
              className="hidden"
            />
            
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className={`p-3 rounded-full mb-2 ${dragActive ? 'bg-primary/10' : 'bg-gray-100'}`}>
                <Upload className={`h-6 w-6 ${dragActive ? 'text-primary' : 'text-gray-500'}`} />
              </div>
              
              <h3 className="text-lg font-medium">
                {dragActive ? 'Drop your file here' : 'Drag & drop your resume'}
              </h3>
              
              <p className="text-sm text-gray-500 max-w-xs">
                Drop your resume here, or click the button below to browse your files
              </p>
              
              {uploadError && (
                <div className="flex items-center text-red-600 bg-red-50 p-2 rounded mt-2 text-sm">
                  <X className="h-4 w-4 mr-1" />
                  {uploadError}
                </div>
              )}
              
              <Button 
                type="button"
                onClick={handleButtonClick}
                className="mt-4"
              >
                Browse Files
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="text-sm text-gray-500">
        <p>
          Your resume will be shared with employers when you apply for jobs.
          Make sure it's up-to-date and highlights your key skills and experiences.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ResumeUpload;
