import { useEffect, useState } from "react";
import { useFetchAPI } from "../useFetchApi";
import { pathAPI } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { parseUrlToQuery } from "@/utils/common";

interface IGroups {
  data?: Array<any>;
  links?: any;
  meta?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    sortBy: Array<any>;
  };
  status?: boolean;
}

export interface ICategoriesSummary {
  id: string;
  name: string;
  description: string;
  total: number;
  categories?: ICategoriesSummary[];
}

export const useGetCategories = ({
  queryKey = "getcategories",
  api = pathAPI.CATEGORY_SUMMARY,
}: {
  queryKey?: string;
  api?: string;
}) => {
  const { fetchApi } = useFetchAPI();

  const [categories, setCategories] = useState<Array<ICategoriesSummary>>([]);

  const {
    data: groupDatas,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const resultCategories = await fetchApi({
        endpoint: api,
      });
      if (resultCategories?.status) {
        return resultCategories?.data;
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!groupDatas) {
      setCategories(groupDatas);
    }
  }, [groupDatas]);

  return { categories, isLoading, isFetching };
};

export const useGetgroups = ({
  queryKey = "getgroups",
  api = `${pathAPI.CATEGORIES}${parseUrlToQuery({
    page: 1,
    limit: 1000,
    name: "",
  })}`,
}: {
  queryKey?: string;
  api?: string;
}) => {
  const { fetchApi } = useFetchAPI();

  const [groups, setGroups] = useState<Array<any>>([]);

  const {
    data: groupDatas,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, status } = await fetchApi({
        endpoint: api,
      });
      if (status) {
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!groupDatas) {
      setGroups(groupDatas);
    }
  }, [groupDatas]);

  return { groups, isLoading, isFetching };
};

export const useGetGeneralgroups = ({
  queryKey = "getGeneralgroups",
}: {
  queryKey?: string;
}) => {
  const { fetchApi } = useFetchAPI();
  const [groups, setGroups] = useState<Array<any>>([]);

  const {
    data: groupDatas,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, status } = await fetchApi({
        endpoint: pathAPI.GENERAL_CATEGORY,
      });
      if (status) {
        return data;
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!!groupDatas) {
      setGroups(groupDatas);
    }
  }, [groupDatas]);

  return { groups, isLoading, isFetching };
};
