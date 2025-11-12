import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users as UsersIcon, Target, Award, BarChart3 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

// Chart typing for config-driven rendering
type ChartType = "bar" | "line" | "area" | "pie" | "radar";

type ChartSeries = {
  key: string;
  label: string;
  color: string;
};

type DataPoint = Record<string, string | number>;
type BlogChartConfig =
  | { type: "pie"; data: DataPoint[]; valueKey: string; labelKey: string }
  | { type: "radar"; data: DataPoint[]; angleKey: string; series: ChartSeries[] }
  | { type: "bar" | "line" | "area"; data: DataPoint[]; xKey: string; series: ChartSeries[] };

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  chart?: BlogChartConfig;
}

// Chart data for different blog posts
const COLORS = ['#d4af37', '#3b82f6', '#8b5cf6', '#22c55e', '#ef4444', '#f59e0b'];

// Blog 1: Cost Savings - Bar Chart
const blog1CostData = [
  { category: 'Office Space', traditional: 9600, withVA: 0 },
  { category: 'Benefits', traditional: 10000, withVA: 0 },
  { category: 'Equipment', traditional: 3000, withVA: 0 },
  { category: 'Salary', traditional: 40000, withVA: 14549 },
  { category: 'Training', traditional: 2000, withVA: 0 },
];

// Blog 2: Task Delegation - Pie Chart
const blog2TaskData = [
  { name: 'Email Management', value: 25, hours: 10 },
  { name: 'Calendar Management', value: 15, hours: 6 },
  { name: 'Social Media', value: 20, hours: 8 },
  { name: 'Data Entry', value: 20, hours: 8 },
  { name: 'Customer Support', value: 20, hours: 8 },
];

// Blog 3: Scaling Business - Area Chart
const blog3ScalingData = [
  { month: 'Month 1', revenue: 50000, costs: 35000, profit: 15000 },
  { month: 'Month 2', revenue: 65000, costs: 38000, profit: 27000 },
  { month: 'Month 3', revenue: 85000, costs: 40000, profit: 45000 },
  { month: 'Month 4', revenue: 110000, costs: 42000, profit: 68000 },
  { month: 'Month 5', revenue: 140000, costs: 45000, profit: 95000 },
  { month: 'Month 6', revenue: 175000, costs: 48000, profit: 127000 },
];

// Blog 4: Remote Work - Line Chart
const blog4RemoteData = [
  { quarter: 'Q1 2023', productivity: 75, satisfaction: 70, retention: 80 },
  { quarter: 'Q2 2023', productivity: 82, satisfaction: 78, retention: 85 },
  { quarter: 'Q3 2023', productivity: 88, satisfaction: 85, retention: 90 },
  { quarter: 'Q4 2023', productivity: 92, satisfaction: 90, retention: 93 },
  { quarter: 'Q1 2024', productivity: 95, satisfaction: 93, retention: 95 },
];

// Blog 5: Onboarding - Radar Chart
const blog5OnboardingData = [
  { metric: 'Communication', week1: 60, week4: 95 },
  { metric: 'Task Completion', week1: 50, week4: 90 },
  { metric: 'Quality', week1: 55, week4: 92 },
  { metric: 'Independence', week1: 40, week4: 88 },
  { metric: 'Speed', week1: 45, week4: 85 },
  { metric: 'Initiative', week1: 35, week4: 80 },
];

// Blog 6: Cost Comparison - Bar Chart
const blog6ComparisonData = [
  { category: 'Base Salary', fullTime: 40000, va: 18000 },
  { category: 'Benefits', fullTime: 8000, va: 0 },
  { category: 'Office Costs', fullTime: 4000, va: 0 },
  { category: 'Equipment', fullTime: 2000, va: 0 },
  { category: 'Training', fullTime: 2000, va: 0 },
  { category: 'Overhead', fullTime: 7000, va: 0 },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How Virtual Assistants Can Save Your Business 70% on Operational Costs",
    excerpt: "Discover the proven strategies that successful businesses use to dramatically reduce costs while maintaining quality through virtual assistants.",
    content: `
      <h2>The Cost Crisis in Modern Business</h2>
      <p>In today's competitive market, businesses are constantly looking for ways to reduce operational costs without sacrificing quality. The average mid-sized company spends 40-60% of its revenue on operational expenses, with personnel costs being the largest component. One of the most effective solutions that has emerged is the strategic use of virtual assistants—a solution that's transforming how businesses operate globally.</p>
      
      <p>The traditional employment model is becoming increasingly unsustainable. Between salaries, benefits, office space, equipment, and administrative overhead, the true cost of an employee can be 1.25 to 1.4 times their base salary. For a €50,000/year employee, you're actually spending €62,500-€70,000 when all costs are factored in.</p>
      
      <h3>Breaking Down the Savings: A Comprehensive Analysis</h3>
      <p>When you hire a virtual assistant instead of a full-time employee, the savings compound across multiple categories:</p>
      
      <h4>Direct Cost Savings</h4>
      <ul>
        <li><strong>Office Space:</strong> €300-€800 per employee per month in major cities</li>
        <li><strong>Equipment & Technology:</strong> €2,000-€5,000 initial + €500/year maintenance</li>
        <li><strong>Benefits & Insurance:</strong> 20-30% of base salary</li>
        <li><strong>Paid Time Off:</strong> 20-30 days per year (€4,000-€8,000 value)</li>
        <li><strong>Sick Leave:</strong> Average 10 days per year (€2,000-€4,000)</li>
      </ul>
      
      <h4>Hidden Cost Savings</h4>
      <ul>
        <li><strong>Recruitment:</strong> €3,000-€10,000 per hire (agency fees, time, advertising)</li>
        <li><strong>Onboarding & Training:</strong> 3-6 months at reduced productivity</li>
        <li><strong>HR Administration:</strong> Payroll, compliance, performance management</li>
        <li><strong>Turnover Risk:</strong> Average employee stays 2-3 years, restart costs</li>
        <li><strong>Management Overhead:</strong> Time spent on supervision and coordination</li>
      </ul>
      
      <h3>Real-World Success Stories: The Numbers Don't Lie</h3>
      <p>We've helped over 200 businesses achieve an average of 70% cost reduction while maintaining or improving service quality. Here are detailed case studies:</p>
      
      <h4>Case Study 1: E-Commerce Company</h4>
      <p><strong>Before:</strong> 3 full-time customer service reps at €8,000/month total<br/>
      <strong>After:</strong> 2 VAs handling same volume at €2,400/month<br/>
      <strong>Result:</strong> €5,600/month savings (70% reduction), response time improved from 4 hours to 2 hours, customer satisfaction increased from 4.2 to 4.7 stars</p>
      
      <h4>Case Study 2: Digital Marketing Agency</h4>
      <p><strong>Before:</strong> 2 admin staff + 1 social media manager at €10,500/month<br/>
      <strong>After:</strong> 3 specialized VAs at €3,200/month<br/>
      <strong>Result:</strong> €7,300/month savings (69% reduction), increased output by 40%, freed up founders for client acquisition</p>
      
      <h4>Case Study 3: SaaS Startup</h4>
      <p><strong>Before:</strong> Founder spending 30 hours/week on admin tasks<br/>
      <strong>After:</strong> 1 VA at €1,200/month handling all admin work<br/>
      <strong>Result:</strong> Founder's time valued at €150/hour = €18,000/month saved, company revenue increased 85% in 6 months due to founder focusing on growth</p>
      
      <h3>Quality Doesn't Have to Suffer: The Native Control Advantage</h3>
      <p>The biggest concern businesses have when considering virtual assistants is quality control. This is where most VA services fail—they provide cheap labor but no quality oversight. The result? Inconsistent work, communication issues, and ultimately, disappointed clients.</p>
      
      <p>At DON VA, we've solved this problem with our unique Native Quality Control system:</p>
      
      <ul>
        <li><strong>Native German Managers:</strong> Every deliverable is reviewed by native German-speaking managers who understand your market, culture, and quality standards</li>
        <li><strong>Three-Tier Review Process:</strong> VA completes work → Team Lead reviews → Native Manager approves → Delivered to you</li>
        <li><strong>Continuous Training:</strong> Regular workshops on German business culture, communication standards, and industry best practices</li>
        <li><strong>Performance Metrics:</strong> We track quality scores, turnaround times, and client satisfaction for every VA</li>
        <li><strong>24-Hour Replacement Guarantee:</strong> If a VA isn't meeting standards, we replace them within 24 hours at no cost</li>
      </ul>
      
      <h3>The ROI Calculator: Your Potential Savings</h3>
      <p>Let's calculate your potential savings with a simple example:</p>
      
      <p><strong>Traditional Employee (€40,000/year salary):</strong></p>
      <ul>
        <li>Base Salary: €40,000</li>
        <li>Benefits (25%): €10,000</li>
        <li>Office Space: €6,000</li>
        <li>Equipment: €3,000</li>
        <li>Training: €2,000</li>
        <li>Management Time: €3,000</li>
        <li><strong>Total Annual Cost: €64,000</strong></li>
      </ul>
      
      <p><strong>Virtual Assistant (20h/week):</strong></p>
      <ul>
        <li>Monthly Cost: €1,200</li>
        <li>Setup Fee (one-time): €149</li>
        <li><strong>Total Annual Cost: €14,549</strong></li>
      </ul>
      
      <p><strong>Annual Savings: €49,451 (77% reduction)</strong></p>
      
      <h3>Getting Started: Your 30-Day Roadmap</h3>
      <p>The transition to virtual assistants doesn't have to be complicated. Here's a proven framework that our most successful clients follow:</p>
      
      <h4>Week 1: Assessment & Planning</h4>
      <ul>
        <li>Audit your current operations and identify repetitive tasks</li>
        <li>Calculate your current costs per function</li>
        <li>Define success metrics (time saved, cost reduced, quality maintained)</li>
        <li>Book your free consultation with DON VA</li>
      </ul>
      
      <h4>Week 2: Onboarding & Training</h4>
      <ul>
        <li>Get matched with your perfect VA based on skills and experience</li>
        <li>Provide access to necessary tools and systems</li>
        <li>Document your processes and expectations</li>
        <li>Set up communication channels and check-in schedules</li>
      </ul>
      
      <h4>Week 3: Pilot Phase</h4>
      <ul>
        <li>Start with 2-3 simple, well-defined tasks</li>
        <li>Monitor quality and turnaround times closely</li>
        <li>Provide feedback and refine processes</li>
        <li>Gradually increase task complexity</li>
      </ul>
      
      <h4>Week 4: Optimization & Scaling</h4>
      <ul>
        <li>Measure results against your success metrics</li>
        <li>Identify additional tasks to delegate</li>
        <li>Consider adding more VAs for different functions</li>
        <li>Calculate your ROI and plan next steps</li>
      </ul>
      
      <h3>Common Mistakes to Avoid</h3>
      <p>Learn from others' experiences. Here are the most common mistakes businesses make when hiring VAs:</p>
      
      <ol>
        <li><strong>Unclear Expectations:</strong> Not documenting processes or success criteria</li>
        <li><strong>Micromanagement:</strong> Not trusting your VA to do the work independently</li>
        <li><strong>Poor Communication:</strong> Irregular check-ins or unclear feedback</li>
        <li><strong>Wrong Tasks:</strong> Delegating strategic work instead of operational tasks</li>
        <li><strong>No Quality Control:</strong> Working with services that don't provide oversight</li>
      </ol>
      
      <h3>The Future is Virtual: Industry Trends</h3>
      <p>The virtual assistant industry is projected to grow from $4.12 billion in 2023 to $25.6 billion by 2030. Why? Because businesses are realizing that operational efficiency is the key to competitive advantage. Companies that embrace virtual teams early are positioning themselves for long-term success.</p>
      
      <p>According to recent studies:</p>
      <ul>
        <li>78% of businesses plan to increase their use of virtual assistants in the next 2 years</li>
        <li>Companies using VAs report 40% higher productivity among their core team</li>
        <li>92% of businesses that try VAs continue using them long-term</li>
        <li>The average ROI on VA investment is 312% in the first year</li>
      </ul>
      
      <h3>Take Action Today</h3>
      <p>Most of our clients see positive ROI within the first month. The question isn't whether you should use virtual assistants—it's how quickly you can get started. Every day you wait is another day of unnecessary costs and missed opportunities.</p>
      
      <p>Book your free 15-minute consultation today and discover exactly how much you could save. No sales pressure, just honest advice on whether virtual assistants are right for your business.</p>
    `,
    author: "Michael Schmidt",
    date: "March 15, 2024",
    readTime: "12 min read",
    category: "Cost Optimization",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    chart: {
      type: "bar",
      data: blog1CostData,
      xKey: "category",
      series: [
        { key: "traditional", label: "Traditional Employee (€)", color: "#ef4444" },
        { key: "withVA", label: "Virtual Assistant (€)", color: "#22c55e" },
      ],
    },
  },
  {
    id: 2,
    title: "5 Tasks You Should Delegate to a Virtual Assistant Today",
    excerpt: "Stop wasting time on routine tasks. Learn which activities you should delegate immediately to free up your schedule for strategic work.",
    content: `
      <h2>Time is Your Most Valuable Asset</h2>
      <p>As a business owner or manager, your time should be spent on high-value activities that drive growth. Yet many professionals find themselves bogged down in routine tasks that could easily be delegated.</p>
      
      <h3>1. Email Management</h3>
      <p>Your VA can filter, categorize, and respond to routine emails, flagging only the important ones for your attention. This alone can save 2-3 hours per day.</p>
      
      <h3>2. Calendar Management</h3>
      <p>Let your VA handle scheduling, rescheduling, and coordinating meetings. They can manage time zones, send reminders, and ensure you're always prepared.</p>
      
      <h3>3. Social Media Management</h3>
      <p>Content scheduling, engagement monitoring, and basic customer service on social platforms can all be handled by a skilled VA.</p>
      
      <h3>4. Data Entry and Research</h3>
      <p>Whether it's updating CRM systems, conducting market research, or compiling reports, VAs excel at these detail-oriented tasks.</p>
      
      <h3>5. Customer Support</h3>
      <p>First-line customer support, handling common questions, and escalating complex issues can be managed efficiently by trained VAs.</p>
      
      <h3>The Impact</h3>
      <p>By delegating these five tasks, most executives free up 15-20 hours per week. That's time you can reinvest in strategy, business development, or work-life balance.</p>
    `,
    author: "Sarah Weber",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop",
    chart: {
      type: "pie",
      data: blog2TaskData,
      valueKey: "value",
      labelKey: "name",
    },
  },
  {
    id: 3,
    title: "The Complete Guide to Scaling Your Business with Virtual Teams",
    excerpt: "Learn the proven framework for building and managing a high-performing virtual team that drives real business results.",
    content: `
      <h2>Why Virtual Teams are the Future</h2>
      <p>The traditional office model is becoming obsolete. Virtual teams offer flexibility, cost savings, and access to global talent that physical offices simply can't match.</p>
      
      <h3>Phase 1: Starting Small</h3>
      <p>Begin with one VA handling a specific function. This allows you to:</p>
      <ul>
        <li>Test the waters with minimal risk</li>
        <li>Develop your management processes</li>
        <li>Identify what works for your business</li>
        <li>Build confidence in the model</li>
      </ul>
      
      <h3>Phase 2: Expanding Strategically</h3>
      <p>Once you've proven the concept, scale strategically. Add VAs for complementary functions, creating a well-rounded team that covers all your operational needs.</p>
      
      <h3>Phase 3: Building Systems</h3>
      <p>As your team grows, invest in proper systems:</p>
      <ul>
        <li>Project management tools (Asana, Trello)</li>
        <li>Communication platforms (Slack, Teams)</li>
        <li>Documentation and SOPs</li>
        <li>Performance tracking metrics</li>
      </ul>
      
      <h3>Managing Across Time Zones</h3>
      <p>With VAs in different time zones, you can achieve 24/7 operations. The key is clear handoff procedures and asynchronous communication practices.</p>
      
      <h3>Quality Control</h3>
      <p>This is where many businesses struggle. At DON VA, we solve this with native German managers who review all work before delivery, ensuring consistent quality.</p>
      
      <h3>The Results</h3>
      <p>Companies that successfully scale with virtual teams typically see 3x growth in operational capacity without proportional cost increases. It's not just about saving money—it's about scaling smart.</p>
    `,
    author: "Thomas Müller",
    date: "March 5, 2024",
    readTime: "7 min read",
    category: "Business Growth",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
    chart: {
      type: "area",
      data: blog3ScalingData,
      xKey: "month",
      series: [
        { key: "revenue", label: "Revenue (€)", color: "#3b82f6" },
        { key: "costs", label: "Costs (€)", color: "#ef4444" },
        { key: "profit", label: "Profit (€)", color: "#22c55e" },
      ],
    },
  }
];

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gold hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    if (!post.chart) return null;
    const c = post.chart;
    if (c.type === "bar") {
      return (
        <BarChart data={c.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey={c.xKey} stroke="#888" angle={-15} textAnchor="end" height={80} />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px' }} />
          <Legend />
          {c.series.map((s) => (
            <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.label} />
          ))}
        </BarChart>
      );
    }
    if (c.type === "line") {
      return (
        <LineChart data={c.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey={c.xKey} stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px' }} />
          <Legend />
          {c.series.map((s) => (
            <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={3} name={s.label} />
          ))}
        </LineChart>
      );
    }
    if (c.type === "area") {
      return (
        <AreaChart data={c.data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey={c.xKey} stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px' }} />
          <Legend />
          {c.series.map((s, i) => (
            <Area key={s.key} type="monotone" dataKey={s.key} stackId={`${i+1}`} stroke={s.color} fill={s.color} fillOpacity={0.6} name={s.label} />
          ))}
        </AreaChart>
      );
    }
    if (c.type === "pie") {
      return (
        <PieChart>
          <Pie
            data={c.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            dataKey={c.valueKey}
            nameKey={c.labelKey}
          >
            {c.data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px' }} />
          <Legend />
        </PieChart>
      );
    }
    // radar
    return (
      <RadarChart data={c.data}>
        <PolarGrid stroke="#444" />
        <PolarAngleAxis dataKey={c.angleKey} stroke="#888" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#888" />
        {c.series.map((s) => (
          <Radar key={s.key} name={s.label} dataKey={s.key} stroke={s.color} fill={s.color} fillOpacity={0.5} />
        ))}
        <Legend />
        <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #d4af37', borderRadius: '8px' }} />
      </RadarChart>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.section
        className="relative pt-4 sm:pt-6 pb-20 sm:pb-24 md:pb-28 lg:pb-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {/* Back button */}
          <motion.button
            onClick={() => navigate('/')}
            className="mt-11 mb-6 sm:mb-8 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-gold/50 rounded-lg sm:rounded-xl text-foreground hover:text-gold transition-all duration-300 font-semibold group shadow-md hover:shadow-lg hover:shadow-gold/10 text-sm sm:text-base"
            whileHover={{ x: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </motion.button>

          <article className="max-w-5xl mx-auto">
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative mb-8 sm:mb-10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group border-2 border-gold/20 hover:border-gold/40 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 sm:h-72 md:h-96 lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>

            {/* Meta info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 sm:mb-8 lg:mb-10"
            >
              <motion.span 
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-500 text-sm sm:text-base font-bold rounded-full mb-6 sm:mb-8 border-2 border-amber-500/30 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                {post.category}
              </motion.span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 text-foreground leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base md:text-lg text-muted-foreground pb-8 sm:pb-10 border-b-2 border-amber-500/20">
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3 bg-card/50 px-4 py-2 rounded-xl border border-border/50 hover:border-amber-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <span className="font-semibold text-foreground">{post.author}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3 bg-card/50 px-4 py-2 rounded-xl border border-border/50 hover:border-amber-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <span className="font-medium">{post.date}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 sm:gap-3 bg-card/50 px-4 py-2 rounded-xl border border-border/50 hover:border-amber-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center border border-amber-500/30">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <span className="font-medium">{post.readTime}</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            {/* Generic chart renderer based on post.chart config */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-12 sm:mb-16 p-8 sm:p-10 md:p-12 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent border-2 border-blue-500/30 rounded-3xl"
            >
              {post.chart && (
                <>
                  <h2 className="text-4xl sm:text-5xl font-bold text-blue-500 mb-4 flex items-center gap-3">
                    <BarChart3 className="w-10 h-10" />
                    Data Insights
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">Key metrics visualized for this article</p>

                  <div className="bg-card/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      {renderChart()}
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </motion.div>

            {/* Blog Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-xl sm:prose-2xl max-w-none mb-12 sm:mb-16
                prose-headings:font-bold
                prose-h2:text-amber-500 prose-h2:text-6xl sm:prose-h2:text-7xl lg:prose-h2:text-8xl prose-h2:mb-12 prose-h2:mt-24 prose-h2:pb-6 prose-h2:border-b-4 prose-h2:border-gradient-to-r prose-h2:from-amber-500 prose-h2:to-yellow-600
                prose-h3:text-yellow-500 prose-h3:text-5xl sm:prose-h3:text-6xl lg:prose-h3:text-7xl prose-h3:mb-8 prose-h3:mt-16
                prose-h4:text-yellow-400 prose-h4:text-4xl sm:prose-h4:text-5xl prose-h4:mb-6 prose-h4:mt-12
                prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-10 prose-p:text-2xl sm:prose-p:text-3xl lg:prose-p:text-4xl
                prose-strong:text-amber-500 prose-strong:font-bold prose-strong:text-2xl sm:prose-strong:text-3xl
                prose-ul:my-12 prose-ul:space-y-6
                prose-ol:my-12 prose-ol:space-y-6
                prose-li:text-foreground/85 prose-li:text-2xl sm:prose-li:text-3xl lg:prose-li:text-4xl prose-li:leading-relaxed prose-li:pl-2
                prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-yellow-500
                [&_ul]:list-none [&_ul]:pl-0
                [&_ul>li]:relative [&_ul>li]:pl-8 [&_ul>li]:before:content-['▸'] [&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:text-amber-500 [&_ul>li]:before:font-bold [&_ul>li]:before:text-xl
                [&_ol]:list-none [&_ol]:pl-0 [&_ol]:counter-reset-[item]
                [&_ol>li]:relative [&_ol>li]:pl-8 [&_ol>li]:counter-increment-[item] [&_ol>li]:before:content-[counter(item)] [&_ol>li]:before:absolute [&_ol>li]:before:left-0 [&_ol>li]:before:text-amber-500 [&_ol>li]:before:font-bold [&_ol>li]:before:text-lg [&_ol>li]:before:bg-amber-500/10 [&_ol>li]:before:w-6 [&_ol>li]:before:h-6 [&_ol>li]:before:rounded-full [&_ol>li]:before:flex [&_ol>li]:before:items-center [&_ol>li]:before:justify-center
                [&_li>strong]:text-amber-500
                [&_br]:my-2"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>

            {/* CTA at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 sm:mt-16 p-6 sm:p-8 md:p-10 lg:p-12 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border-2 border-gold/30 rounded-xl sm:rounded-2xl text-center relative overflow-hidden group hover:border-gold/50 transition-all duration-300"
            >
              {/* Background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-foreground">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
                  Book a free consultation and discover how virtual assistants can help you scale.
                </p>
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gold text-foreground font-semibold text-sm sm:text-base rounded-lg sm:rounded-xl hover:bg-gold/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="hidden sm:inline">Book Free Consultation →</span>
                  <span className="sm:hidden">Get Started →</span>
                </button>
              </div>
            </motion.div>

            {/* Related Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-border"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-foreground">More Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {blogPosts.filter(p => p.id !== post.id).slice(0, 2).map((relatedPost) => (
                  <motion.div
                    key={relatedPost.id}
                    onClick={() => navigate(`/blog/${relatedPost.id}`)}
                    className="group cursor-pointer bg-card border border-border/50 rounded-lg sm:rounded-xl overflow-hidden hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
                    whileHover={{ y: -4 }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-36 sm:h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-gold text-foreground text-xs font-bold rounded-full">{relatedPost.category}</span>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h4 className="text-base sm:text-lg font-bold mb-2 text-foreground group-hover:text-gold transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">{relatedPost.excerpt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </article>
        </div>
      </motion.section>
    </div>
  );
};

export default BlogDetail;
