CREATE TABLE `User` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`loginId` VARCHAR(100) NOT NULL COMMENT '로그인 ID',
	`password` VARCHAR(255) NOT NULL COMMENT '비밀번호',
    `email` VARCHAR(100) NOT NULL COMMENT '이메일',
	`phone` VARCHAR(12) NOT NULL COMMENT '전화번호', 
	`nickname` VARCHAR(100) NULL COMMENT '닉네임', 
    `grade` VARCHAR(10) NOT NULL COMMENT '권한', 
	`createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='회원 테이블'; 

CREATE TABLE `Address` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `userId` BIGINT(20) NOT NULL COMMENT '회원 ID',
	`address` VARCHAR(255) NOT NULL COMMENT '주소',
	`createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`),
    CONSTRAINT `FK_USER_ADDRESS` FOREIGN KEY (`userId`) REFERENCES `User` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='회원주소 테이블'; 

CREATE TABLE `ShopCategory` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL COMMENT '카테고리명',
    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='가게 카테고리 테이블'; 

CREATE TABLE `Shop` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `shopCategoryId` BIGINT(20) NOT NULL COMMENT '카테고리 ID',
    `name` VARCHAR(100) NOT NULL COMMENT '가게명',
    `businessName` VARCHAR(100) NULL COMMENT '상호명',
    `phone` VARCHAR(12) NULL COMMENT '가게 전화번호',
    `address` VARCHAR(12) NULL COMMENT '가게 주소',
    `imageUrl` TEXT NULL COMMENT '가게 로고 이미지',
    `description` TEXT NULL COMMENT '가게 로고 이미지',
    `rating` DECIMAL(2,1) NOT NULL DEFAULT 0 COMMENT '평점',
    `orderCount` INT NOT NULL DEFAULT 0 COMMENT '주문 수',
    `dibsCount` INT NOT NULL DEFAULT 0 COMMENT '찜 수',
    `reviewCount` INT NOT NULL DEFAULT 0 COMMENT '리뷰 수',
    `deliveryTip` INT NOT NULL DEFAULT 0 COMMENT '배달비',
    `deliveryTime` INT NOT NULL DEFAULT 0 COMMENT '배달예상시간',
    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`),
    CONSTRAINT `FK_SHOP_CATEGORY` FOREIGN KEY (`shopCategoryId`) REFERENCES `ShopCategory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='가게 테이블'; 

CREATE TABLE `MenuGroup` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `shopId` BIGINT(20) NOT NULL COMMENT '가게 ID',
    `name` VARCHAR(100) NOT NULL COMMENT '메뉴 그룹명',
    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴 그룹 테이블'; 

CREATE TABLE `Menu` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `shopId` BIGINT(20) NOT NULL COMMENT '가게 ID',
    `menuGroupId` BIGINT(20) NOT NULL COMMENT '메뉴 그룹 ID',
    `name` VARCHAR(100) NOT NULL COMMENT '메뉴명',
    `description` TEXT NULL COMMENT '메뉴 설명',
    `imageUrl` TEXT NULL COMMENT '메뉴 이미지',
    `price` INT NOT NULL COMMENT '메뉴 가격',
    `isRecommend` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '추천 여부',
    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`),
    CONSTRAINT `FK_SHOP_MENU` FOREIGN KEY (`shopId`) REFERENCES `Shop` (`id`),
    CONSTRAINT `FK_MENU_GROUP` FOREIGN KEY (`menuGroupId`) REFERENCES `MenuGroup` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴 테이블'; 

CREATE TABLE `MenuOption` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
    `menuId` BIGINT(20) NOT NULL COMMENT '메뉴 ID',
    `name` VARCHAR(100) NOT NULL COMMENT '메뉴 옵션명',
    `description` TEXT NULL COMMENT '메뉴 옵션 설명',
    `price` INT NOT NULL COMMENT '메뉴 가격',
    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`),
    CONSTRAINT `FK_MENU_OPTION` FOREIGN KEY (`menuId`) REFERENCES `Menu` (`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='메뉴 옵션 테이블'; 

CREATE TABLE `Cart` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,

    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='장바구니 테이블'; 

CREATE TABLE `Order` (
    `id` BIGINT(20) NOT NULL AUTO_INCREMENT,

    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    `deletedDate` datetime(6) DEFAULT NULL, 
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='주문 테이블'; 
