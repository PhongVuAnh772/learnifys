import { supabase } from "@/supabase";

// Định nghĩa kiểu filter cho các cột thông thường
type FilterCondition = {
    eq?: string | number | boolean;
    neq?: string | number | boolean;
    gt?: number;
    lt?: number;
    gte?: number;
    lte?: number;
    like?: string;
    ilike?: string;
    is?: null | boolean;
    in?: (string | number)[];
};

// Định nghĩa kiểu filter cho cột dạng mảng
type ArrayFilterCondition = {
    contains?: (string | number)[];
    containedBy?: (string | number)[];
};

// Định nghĩa kiểu tham số cho hàm
type QueryParams = {
    columns?: string; // Các cột cần select
    filters?: Record<string, FilterCondition>; // Bộ lọc thông thường
    arrayFilters?: Record<string, ArrayFilterCondition>; // Bộ lọc cho mảng
};

// Hàm lấy tất cả assignments
const getAllAssignments = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {} } = params;

    let query = supabase.from('assignments').select(columns);

    // Áp dụng các bộ lọc
    for (const [key, condition] of Object.entries(filters)) {
        for (const [operator, value] of Object.entries(condition)) {
            switch (operator) {
                case 'eq':
                    query = query.eq(key, value);
                    break;
                case 'neq':
                    query = query.neq(key, value);
                    break;
                case 'gt':
                    query = query.gt(key, value as number);
                    break;
                case 'lt':
                    query = query.lt(key, value as number);
                    break;
                case 'gte':
                    query = query.gte(key, value as number);
                    break;
                case 'lte':
                    query = query.lte(key, value as number);
                    break;
                case 'like':
                    query = query.like(key, value as string);
                    break;
                case 'ilike':
                    query = query.ilike(key, value as string);
                    break;
                case 'is':
                    query = query.is(key, value);
                    break;
                case 'in':
                    query = query.in(key, value as (string | number)[]);
                    break;
                default:
                    console.warn(`Unknown filter operator: ${operator}`);
            }
        }
    }

    const { data: assignments, error } = await query;
    return { assignments, error };
};

// Hàm lấy assignments với điều kiện lọc phức tạp
const getAssignmentWithFilter = async (params: QueryParams = {}) => {
    const { columns = '*', filters = {}, arrayFilters = {} } = params;

    let query = supabase.from('assignments').select(columns);

    // Áp dụng các bộ lọc thông thường
    for (const [key, condition] of Object.entries(filters)) {
        for (const [operator, value] of Object.entries(condition)) {
            switch (operator) {
                case 'eq':
                    query = query.eq(key, value);
                    break;
                case 'neq':
                    query = query.neq(key, value);
                    break;
                case 'gt':
                    query = query.gt(key, value as number);
                    break;
                case 'lt':
                    query = query.lt(key, value as number);
                    break;
                case 'gte':
                    query = query.gte(key, value as number);
                    break;
                case 'lte':
                    query = query.lte(key, value as number);
                    break;
                case 'like':
                    query = query.like(key, value as string);
                    break;
                case 'ilike':
                    query = query.ilike(key, value as string);
                    break;
                case 'is':
                    query = query.is(key, value);
                    break;
                case 'in':
                    query = query.in(key, value as (string | number)[]);
                    break;
                default:
                    console.warn(`Unknown filter operator: ${operator}`);
            }
        }
    }

    // Áp dụng các bộ lọc cho cột dạng mảng
    for (const [key, condition] of Object.entries(arrayFilters)) {
        for (const [operator, value] of Object.entries(condition)) {
            switch (operator) {
                case 'contains':
                    query = query.contains(key, value as (string | number)[]);
                    break;
                case 'containedBy':
                    query = query.containedBy(key, value as (string | number)[]);
                    break;
                default:
                    console.warn(`Unknown array filter operator: ${operator}`);
            }
        }
    }

    const { data: assignments, error } = await query;
    return { assignments, error };
};

// Hàm lấy assignments với cột cụ thể và tham chiếu bảng khác
const getSpecificAssignments = async (params: QueryParams = {}) => {
    const { columns = `some_column, other_table (foreign_key)`, filters = {} } = params;

    let query = supabase.from('assignments').select(columns);

    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value.eq); // Mặc định sử dụng `eq` cho đơn giản
    }

    const { data: assignments, error } = await query;
    return { assignments, error };
};

// Hàm lấy assignments với tham chiếu bảng khác
const getReferenceAssignments = async (params: QueryParams = {}) => {
    const { columns = `some_column, other_table (foreign_key)`, filters = {} } = params;

    let query = supabase.from('assignments').select(columns);

    for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value.eq); // Mặc định sử dụng `eq` cho đơn giản
    }

    const { data: assignments, error } = await query;
    return { assignments, error };
};

export {
    getAllAssignments,
    getSpecificAssignments,
    getReferenceAssignments,
    getAssignmentWithFilter
};
