import { create } from 'zustand';export const useUiStore=create<{sidebarOpen:boolean;toggle:()=>void}>((set,get)=>({sidebarOpen:true,toggle:()=>set({sidebarOpen:!get().sidebarOpen})}));
