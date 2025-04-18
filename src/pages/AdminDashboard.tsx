
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Users, 
  Briefcase, 
  Building, 
  Bell, 
  Shield, 
  Search, 
  MoreHorizontal, 
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash,
  Download,
  FileText
} from 'lucide-react';

// Mock data for dashboard
const usersByRole = [
  { name: 'Job Seekers', value: 1200 },
  { name: 'Recruiters', value: 350 },
  { name: 'Admins', value: 5 },
];

const applicationStats = [
  { name: 'Jan', applications: 65, interviews: 24 },
  { name: 'Feb', applications: 78, interviews: 32 },
  { name: 'Mar', applications: 95, interviews: 41 },
  { name: 'Apr', applications: 105, interviews: 48 },
  { name: 'May', applications: 122, interviews: 55 },
  { name: 'Jun', applications: 131, interviews: 61 },
];

const jobsByCategory = [
  { name: 'Technology', jobs: 85 },
  { name: 'Marketing', jobs: 45 },
  { name: 'Design', jobs: 38 },
  { name: 'Finance', jobs: 42 },
  { name: 'HR', jobs: 22 },
  { name: 'Other', jobs: 29 },
];

const recentUsers = [
  { id: 1, name: 'Emma Wilson', email: 'emma.w@example.com', role: 'Job Seeker', status: 'active', lastActive: '2 hours ago', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Richard Moore', email: 'richard.m@example.com', role: 'Recruiter', status: 'active', lastActive: '1 day ago', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 3, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Job Seeker', status: 'inactive', lastActive: '3 days ago', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'Michael Chen', email: 'michael.c@example.com', role: 'Recruiter', status: 'pending', lastActive: '5 days ago', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 5, name: 'Jennifer Lee', email: 'jennifer.l@example.com', role: 'Job Seeker', status: 'active', lastActive: '1 week ago', avatar: 'https://i.pravatar.cc/150?img=9' },
];

const recentJobs = [
  { id: 1, title: 'Senior React Developer', company: 'TechCorp Inc.', location: 'San Francisco, CA', status: 'approved', applicants: 18, posted: '2 days ago' },
  { id: 2, title: 'Marketing Manager', company: 'Creative Solutions', location: 'New York, NY', status: 'pending', applicants: 7, posted: '1 day ago' },
  { id: 3, title: 'UX Designer', company: 'DesignHub', location: 'Remote', status: 'approved', applicants: 12, posted: '3 days ago' },
  { id: 4, title: 'Financial Analyst', company: 'InvestGrow', location: 'Chicago, IL', status: 'rejected', applicants: 5, posted: '5 days ago' },
  { id: 5, title: 'HR Specialist', company: 'GlobalHR', location: 'Austin, TX', status: 'approved', applicants: 9, posted: '1 week ago' },
];

const recentReports = [
  { id: 1, type: 'Job Posting', title: 'Inappropriate content in job description', status: 'pending', reportedBy: 'Alex T.', reportDate: '1 day ago' },
  { id: 2, type: 'User', title: 'Fake recruiter profile', status: 'resolved', reportedBy: 'Maria G.', reportDate: '3 days ago' },
  { id: 3, type: 'Job Posting', title: 'Misleading salary information', status: 'investigating', reportedBy: 'John D.', reportDate: '5 days ago' },
  { id: 4, type: 'Company', title: 'Company information is inaccurate', status: 'resolved', reportedBy: 'Robert K.', reportDate: '1 week ago' },
  { id: 5, type: 'User', title: 'Spam messages from user', status: 'pending', reportedBy: 'Lisa W.', reportDate: '1 week ago' },
];

// Colors for charts
const COLORS = ['#1EAEDB', '#9B87F5', '#F5A623', '#7E69AB', '#D6BCFA'];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Function to filter users based on search term and status
  const filterUsers = (users: any[]) => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' ? true : user.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  // Function to filter jobs based on search term and status
  const filterJobs = (jobs: any[]) => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        job.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' ? true : job.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  const handleStatusChange = (jobId: number, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Job #${jobId} status changed to ${newStatus}`,
    });
  };

  const handleUserStatusToggle = (userId: number, isActive: boolean) => {
    toast({
      title: isActive ? "User Activated" : "User Deactivated",
      description: `User #${userId} has been ${isActive ? 'activated' : 'deactivated'}`,
    });
  };

  const handleReportResolution = (reportId: number) => {
    toast({
      title: "Report Resolved",
      description: `Report #${reportId} has been marked as resolved`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Your data export is being prepared and will be available shortly",
    });
  };

  return (
    <MainLayout>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-slate-300 mt-1">Manage your platform and monitor activity</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-slate-800">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button className="bg-white text-slate-800 hover:bg-slate-100">
                <Shield className="mr-2 h-4 w-4" />
                Security Logs
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Dashboard Content */}
      <section className="py-6 bg-gray-50">
        <div className="container px-4 md:px-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-3xl font-bold">1,555</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Users className="h-6 w-6 text-brand-blue" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+12.5%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                    <p className="text-3xl font-bold">261</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Briefcase className="h-6 w-6 text-brand-purple" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+5.3%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Companies</p>
                    <p className="text-3xl font-bold">78</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Building className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-green-500 font-medium">+3.2%</span>
                  <span className="text-muted-foreground ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Reports</p>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-full">
                    <Bell className="h-6 w-6 text-red-500" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-red-500 font-medium">+2</span>
                  <span className="text-muted-foreground ml-1">new reports</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* User Breakdown */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>User Breakdown</CardTitle>
                <CardDescription>Distribution of users by role</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={usersByRole}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {usersByRole.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 flex-wrap mt-2">
                  {usersByRole.map((entry, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                      <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-sm">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Application Trends */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle>Application Trends</CardTitle>
                <CardDescription>Applications and interviews over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={applicationStats}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="applications" 
                        stroke="#1EAEDB" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="interviews" 
                        stroke="#9B87F5" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Job Categories */}
            <Card className="lg:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle>Jobs by Category</CardTitle>
                <CardDescription>Distribution of active job listings</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={jobsByCategory}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="jobs" fill="#1EAEDB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Management Tabs */}
          <Tabs defaultValue="users" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Users</span>
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Jobs</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>Reports</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Search and Filters - Shared across tabs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}>
                  Reset
                </Button>
                <Button onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
            
            {/* Users Tab */}
            <TabsContent value="users" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Users</CardTitle>
                  <CardDescription>View and manage user accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterUsers(recentUsers).map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              user.role === 'Recruiter' ? 'bg-blue-50 text-blue-600' :
                              user.role === 'Admin' ? 'bg-purple-50 text-purple-600' :
                              'bg-green-50 text-green-600'
                            }>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={
                                user.status === 'active' ? 'bg-green-100 text-green-800' :
                                user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                'bg-yellow-100 text-yellow-800'
                              }>
                                {user.status === 'active' && <CheckCircle className="h-3 w-3 mr-1" />}
                                {user.status === 'inactive' && <XCircle className="h-3 w-3 mr-1" />}
                                {user.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{user.lastActive}</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <div className="flex items-center">
                                <Switch 
                                  id={`user-status-${user.id}`} 
                                  checked={user.status === 'active'}
                                  onCheckedChange={(checked) => handleUserStatusToggle(user.id, checked)}
                                />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <div className="text-sm text-muted-foreground">
                    Page 1 of 10
                  </div>
                  <Button>Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Jobs Tab */}
            <TabsContent value="jobs" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Job Listings</CardTitle>
                  <CardDescription>Review and moderate job postings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Applicants</TableHead>
                        <TableHead>Posted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterJobs(recentJobs).map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{job.title}</p>
                              <p className="text-sm text-gray-500">{job.location}</p>
                            </div>
                          </TableCell>
                          <TableCell>{job.company}</TableCell>
                          <TableCell>
                            <Badge className={
                              job.status === 'approved' ? 'bg-green-100 text-green-800' :
                              job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }>
                              {job.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {job.status === 'rejected' && <XCircle className="h-3 w-3 mr-1" />}
                              {job.status === 'pending' && <AlertCircle className="h-3 w-3 mr-1" />}
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{job.applicants}</TableCell>
                          <TableCell>{job.posted}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Select 
                                defaultValue={job.status}
                                onValueChange={(value) => handleStatusChange(job.id, value)}
                              >
                                <SelectTrigger className="h-8 w-28">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="approved">Approve</SelectItem>
                                  <SelectItem value="rejected">Reject</SelectItem>
                                  <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <div className="text-sm text-muted-foreground">
                    Page 1 of 5
                  </div>
                  <Button>Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Issues</CardTitle>
                  <CardDescription>Review and handle reported content and user issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell>
                            <Badge variant="outline">
                              {report.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.title}</TableCell>
                          <TableCell>
                            <Badge className={
                              report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                              report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{report.reportedBy}</TableCell>
                          <TableCell>{report.reportDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                disabled={report.status === 'resolved'}
                                onClick={() => handleReportResolution(report.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Previous</Button>
                  <div className="text-sm text-muted-foreground">
                    Page 1 of 2
                  </div>
                  <Button>Next</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminDashboard;
