import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { CSSProperties } from "@mui/material/styles/createMixins";
import ClearIcon from "@mui/icons-material/Clear";
import useGetInfiniteSearchAddresses from "@/hooks/queries/useGetInfiniteSearchAddress";

const SearchAddress = () => {
  const [keyword, setKeyword] = useState("");
  const [isQueryEnabled, setIsQueryEnabled] = useState(false); // 쿼리 실행 여부
  const [addresses, setAddresses] = useState([]);

  const { data, isLoading, isError, status } = useGetInfiniteSearchAddresses(
    keyword,
    isQueryEnabled
  );

  useEffect(() => {
    if (data?.pages && status === "success") {
      const list = [];
      data?.pages.forEach((page) => list.push(...page.list));
      setAddresses(list);
    }
  }, [data]);

  // 키워드 입력시 쿼리 비활성화
  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsQueryEnabled(false);
    setKeyword(e.target.value);
  };

  // 주소 입력창 키워드 clear
  const handleClearKeyword = () => {
    setKeyword("");
  };

  // 주소 검색시
  const handleSearchAddress = () => {
    if (!keyword.trim()) return;
    setIsQueryEnabled(true);
  };

  // 엔터 입력시 주소 검색 실행
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchAddress();
    }
  };

  /**
   * TO-DO
   * 1. 선택한 주소의 lat, lng 가져오기 (address api)
   * 2. ShopListPage 에 lat, lng 전달
   * 3. localStorage.set("addresses", ${기존 값에 추가해서 새로 저장})
   */
  const handleSelectAddress = (value: string) => {
    console.log(value);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ position: "relative", display: "flex", margin: "10px" }}>
        <OutlinedInput
          fullWidth
          color="secondary"
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="clear"
                size="small"
                onClick={handleClearKeyword}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
          placeholder="건물명, 도로명, 지번으로 검색하세요."
          value={keyword}
          onChange={handleChangeKeyword}
          onKeyDown={handleKeyDown}
          sx={styles.input}
        />

        <Button
          variant="outlined"
          color="inherit"
          onClick={handleSearchAddress}
        >
          검색
        </Button>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Box sx={styles.dropdown}>
            <Typography color="error" margin="10px">
              주소 검색에 실패했습니다.
            </Typography>
          </Box>
        ) : (
          <Box
            display={addresses.length > 0 ? "block" : "none"}
            sx={styles.dropdown}
          >
            <List>
              {addresses.map((addr, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleSelectAddress(addr)}
                  divider
                  dense
                >
                  <ListItemText
                    sx={{ color: "#333" }}
                    primary={`${addr.address}`}
                    secondary={`[도로명] ${addr.roadAddress}`}
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Container>
  );
};

const styles: { [key: string]: CSSProperties } = {
  input: {
    backgroundColor: "#fff",
    padding: 0,
    border: 0,
  },
  dropdown: {
    position: "absolute",
    top: "100%", // 주소 입력 창 아래에 배치
    left: 0,
    right: 0,
    zIndex: 2, // 다른 요소 위에 표시
    minWidth: "160px",
    padding: "0",
    margin: " 2px 0 0",
    float: "left",
    maxHeight: "200px",
    overflow: "auto", // 스크롤 활성화
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
};

export default SearchAddress;
