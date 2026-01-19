
import { University, Hostel, CommunityPost, Student, SortOrder } from '../types';
import { UNIVERSITIES as INITIAL_UNIVERSITIES, HOSTELS as INITIAL_HOSTELS, COMMUNITY_POSTS as INITIAL_COMMUNITY, SPOTLIGHT_STUDENTS as INITIAL_STUDENTS } from '../data';

// Helper to handle localStorage
const storage = {
  get: <T>(key: string, initial: T): T => {
    const data = localStorage.getItem(`unistay_${key}`);
    return data ? JSON.parse(data) : initial;
  },
  set: <T>(key: string, value: T) => {
    localStorage.setItem(`unistay_${key}`, JSON.stringify(value));
  }
};

// Backend Helper: Logic moved from frontend to simulate server-side processing
const parseMinPrice = (priceStr: string): number => {
  const match = priceStr.match(/UGX\s*([\d.]+)([kM])?/i);
  if (!match) return 0;
  let val = parseFloat(match[1]);
  const multiplier = match[2]?.toLowerCase();
  if (multiplier === 'k') val *= 1000;
  if (multiplier === 'm') val *= 1000000;
  return val;
};

interface HostelQueryParams {
  universityId?: string;
  searchQuery?: string;
  sortBy?: SortOrder;
}

class ApiService {
  private universities: University[] = storage.get('universities', INITIAL_UNIVERSITIES);
  private hostels: Hostel[] = storage.get('hostels', INITIAL_HOSTELS);
  private posts: CommunityPost[] = storage.get('posts', INITIAL_COMMUNITY);
  private students: Student[] = storage.get('students', INITIAL_STUDENTS);

  private persist() {
    storage.set('universities', this.universities);
    storage.set('hostels', this.hostels);
    storage.set('posts', this.posts);
    storage.set('students', this.students);
  }

  // Universities
  async getUniversities() { 
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.universities]; 
  }

  // Hostels - Now implements BACKEND-SIDE Filtering and Sorting
  async getHostels(params: HostelQueryParams = {}) {
    const { universityId, searchQuery, sortBy } = params;
    
    // Simulate network delay for processing
    await new Promise(resolve => setTimeout(resolve, 300));

    let results = [...this.hostels];

    // 1. Backend Filter: University
    if (universityId && universityId !== 'all') {
      results = results.filter(h => h.universityId === universityId);
    }

    // 2. Backend Search: Name and Amenities
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(h => 
        h.name.toLowerCase().includes(q) || 
        h.amenities.some(a => a.toLowerCase().includes(q))
      );
    }

    // 3. Backend Sort: Order logic
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => parseMinPrice(a.priceRange) - parseMinPrice(b.priceRange));
        break;
      case 'price-desc':
        results.sort((a, b) => parseMinPrice(b.priceRange) - parseMinPrice(a.priceRange));
        break;
      case 'rating-desc':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default might be recommended first, then rating
        results.sort((a, b) => {
          if (a.isRecommended && !b.isRecommended) return -1;
          if (!a.isRecommended && b.isRecommended) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return results;
  }

  async saveHostel(hostel: Hostel) {
    const index = this.hostels.findIndex(h => h.id === hostel.id);
    if (index > -1) this.hostels[index] = hostel;
    else this.hostels.push({ ...hostel, id: `h${Date.now()}` });
    this.persist();
    return hostel;
  }

  async deleteHostel(id: string) {
    this.hostels = this.hostels.filter(h => h.id !== id);
    this.persist();
  }

  // Community
  async getPosts() { return [...this.posts]; }
  async savePost(post: CommunityPost) {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index > -1) this.posts[index] = post;
    else this.posts.push({ ...post, id: `p${Date.now()}` });
    this.persist();
    return post;
  }
  async deletePost(id: string) {
    this.posts = this.posts.filter(p => p.id !== id);
    this.persist();
  }

  // Students
  async getStudents() { return [...this.students]; }
  async saveStudent(student: Student) {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index > -1) this.students[index] = student;
    else this.students.push({ ...student, id: `s${Date.now()}` });
    this.persist();
    return student;
  }
  async deleteStudent(id: string) {
    this.students = this.students.filter(s => s.id !== id);
    this.persist();
  }
}

export const api = new ApiService();
