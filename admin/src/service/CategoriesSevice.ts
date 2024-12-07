import React from 'react';
import { Category } from '../model/CategoriesModel';
const API_URL = 'http://localhost:7777';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const GetCategories = async (): Promise<Category> => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: any = await response.json();

  if (!response.ok) {
    return data;
  }

  return data;
};

export const DeleteCategoriesByid = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting category:', errorData);
      MySwal.fire({
        title: 'Xóa Thất Bại',
        text: errorData.message || 'Lỗi không xác định',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    return response.json();
  } catch (error) {
    console.error('Unexpected error during delete:', error);
    MySwal.fire({
      title: 'Xóa Thất Bại',
      text: error instanceof Error ? error.message : 'Lỗi không xác định',
      icon: 'error',
      confirmButtonText: 'OK',
    });
}
};

export const UpdateCategoriesByid = async (id: string | undefined, category: Category): Promise<Category> => {
  const response = await fetch(`${API_URL}/categories/${id}/update`, {
    method: "post",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: any = await response.json();

  if (!response.ok) {
    return data;
  }

  return data;
};

export const CreateCategories = async (category: Category): Promise<Category> => {
  const response = await fetch(`${API_URL}/categories/add`, {
    method: "post",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: any = await response.json();

  if (!response.ok) {
    return data;
  }

  return data;
};

export const GetCategoriesById = async (id: string): Promise<Category> => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch category');
  }

  const data: Category = await response.json();
  return data;
};