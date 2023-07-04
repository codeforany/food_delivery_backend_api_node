-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 04, 2023 at 08:39 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `food_delivery`
--

-- --------------------------------------------------------

--
-- Table structure for table `about_detail`
--

CREATE TABLE `about_detail` (
  `about_id` int(11) NOT NULL,
  `detail` varchar(1000) NOT NULL DEFAULT '',
  `display_order` int(11) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `about_detail`
--

INSERT INTO `about_detail` (`about_id`, `detail`, `display_order`, `created_date`, `update_date`, `status`) VALUES
(1, 'Line1', 1, '2023-07-03 17:37:47', '2023-07-03 17:37:47', 1),
(2, 'Line number 2', 2, '2023-07-03 17:38:10', '2023-07-03 17:38:45', 1);

-- --------------------------------------------------------

--
-- Table structure for table `card_detail`
--

CREATE TABLE `card_detail` (
  `payment_method_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '1 = card, 2 = online',
  `card_number` varchar(40) NOT NULL DEFAULT '',
  `card_mm` varchar(3) NOT NULL DEFAULT '01',
  `card_yyyy` varchar(5) NOT NULL DEFAULT '2023',
  `card_code` varchar(5) NOT NULL DEFAULT '000',
  `first_name` varchar(50) NOT NULL DEFAULT '',
  `last_name` varchar(50) NOT NULL DEFAULT '',
  `is_remove_any` int(1) NOT NULL DEFAULT 1,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1 = active, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cart_detail`
--

CREATE TABLE `cart_detail` (
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `restaurant_id` int(11) NOT NULL DEFAULT 0,
  `menu_item_id` int(11) NOT NULL DEFAULT 0,
  `portion_id` varchar(50) NOT NULL DEFAULT '',
  `ingredient_id` varchar(50) NOT NULL DEFAULT '',
  `qty` int(11) NOT NULL DEFAULT 1,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category_detail`
--

CREATE TABLE `category_detail` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `image` varchar(150) NOT NULL DEFAULT '',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 1 COMMENT '1= active, 0= inactive, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category_detail`
--

INSERT INTO `category_detail` (`category_id`, `name`, `image`, `create_date`, `update_date`, `status`) VALUES
(1, 'Offer1', 'category/202307042311321132VTyNKPWv2A.png', '2023-07-04 23:09:21', '2023-07-04 23:12:33', 1),
(2, 'Sri Lankan', 'category/202307042323252325K4XFtFmZW6.png', '2023-07-04 23:23:25', '2023-07-04 23:23:25', 1),
(3, 'Italian', 'category/202307042323382338nZatnSkdLM.png', '2023-07-04 23:23:38', '2023-07-04 23:23:38', 1),
(4, 'Indian', 'category/202307042323512351AqLV8MpBxe.png', '2023-07-04 23:23:51', '2023-07-04 23:23:51', 1);

-- --------------------------------------------------------

--
-- Table structure for table `favorite_detail`
--

CREATE TABLE `favorite_detail` (
  `favorite_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `menu_item_id` int(11) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = Fav, 0 = Unfav'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `inbox_detail`
--

CREATE TABLE `inbox_detail` (
  `inbox_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(100) NOT NULL DEFAULT '',
  `detail` varchar(1000) NOT NULL DEFAULT '',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 0 COMMENT '0 = new, 1 = read, 2 delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_detail`
--

CREATE TABLE `ingredient_detail` (
  `ingredient_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(75) NOT NULL DEFAULT '',
  `addition_price` varchar(500) NOT NULL DEFAULT '',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 0 = inactive, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ingredient_detail`
--

INSERT INTO `ingredient_detail` (`ingredient_id`, `menu_item_id`, `name`, `addition_price`, `create_date`, `update_date`, `status`) VALUES
(1, 1, 'Extra Mayonnaise', '2', '2023-07-05 00:06:53', '2023-07-05 00:08:18', 2),
(2, 1, 'Extra Mayonnaise', '1', '2023-07-05 00:07:08', '2023-07-05 00:07:08', 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu_detail`
--

CREATE TABLE `menu_detail` (
  `menu_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `image` varchar(150) NOT NULL DEFAULT '',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 0 = inactive, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu_detail`
--

INSERT INTO `menu_detail` (`menu_id`, `name`, `image`, `create_date`, `update_date`, `status`) VALUES
(1, 'Fast Food', 'menu/202307042321442144CHbmnn7qvO.png', '2023-07-04 23:20:21', '2023-07-04 23:22:10', 1),
(2, 'Beverages', 'menu/202307042320402040odmUiHL5OV.png', '2023-07-04 23:20:40', '2023-07-04 23:20:40', 1),
(3, 'Desserts', 'menu/202307042320542054VMZPL3snnQ.png', '2023-07-04 23:20:54', '2023-07-04 23:20:54', 1),
(4, 'Promotions', 'menu/20230704232109219TPmXMshwip.png', '2023-07-04 23:21:09', '2023-07-04 23:21:09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu_item_detail`
--

CREATE TABLE `menu_item_detail` (
  `menu_item_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL DEFAULT 0,
  `restaurant_id` int(11) NOT NULL DEFAULT 0,
  `category_id` int(11) NOT NULL DEFAULT 0,
  `food_type` varchar(100) NOT NULL DEFAULT '',
  `name` varchar(150) NOT NULL DEFAULT '',
  `image` varchar(150) NOT NULL DEFAULT '',
  `is_portion_allow` int(1) NOT NULL DEFAULT 1 COMMENT '0 = inactive, 1 = active',
  `is_custom_ingredient_allow` int(1) NOT NULL DEFAULT 1 COMMENT '0 = inactive, 1 = active',
  `description` varchar(2000) NOT NULL DEFAULT '',
  `base_price` double NOT NULL DEFAULT 0,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1= active, 0 = inactive, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu_item_detail`
--

INSERT INTO `menu_item_detail` (`menu_item_id`, `menu_id`, `restaurant_id`, `category_id`, `food_type`, `name`, `image`, `is_portion_allow`, `is_custom_ingredient_allow`, `description`, `base_price`, `create_date`, `update_date`, `status`) VALUES
(1, 1, 1, 1, 'Desserts', 'French Apple Pie', 'menu_item/202307042340054053rVr556JB5.png', 1, 1, 'description', 15, '2023-07-04 23:40:05', '2023-07-04 23:44:33', 2),
(2, 1, 1, 1, 'Desserts', 'Fudgy Chewy Brownies', 'menu_item/202307042343274327Y8esYcy0Us.png', 1, 1, 'description', 15, '2023-07-04 23:41:26', '2023-07-04 23:43:27', 1),
(3, 1, 1, 1, 'Desserts', 'Dark Chocolate Cake', 'menu_item/202307042341404140CmoP2MX7mr.png', 1, 1, 'description', 15, '2023-07-04 23:41:40', '2023-07-04 23:41:40', 1),
(4, 1, 1, 1, 'Desserts', 'Fudgy Chewy Brownies', 'menu_item/202307042342114211Rhyu0UoYXT.png', 1, 1, 'description', 15, '2023-07-04 23:42:11', '2023-07-04 23:42:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notification_detail`
--

CREATE TABLE `notification_detail` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `title` varchar(150) NOT NULL DEFAULT '',
  `detail` varchar(500) NOT NULL DEFAULT '',
  `ref_id` varchar(20) NOT NULL DEFAULT '',
  `notification_type` varchar(3) NOT NULL DEFAULT '0',
  `is_read` int(1) NOT NULL DEFAULT 0 COMMENT '0 = new, 1 = read',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `offer_detail`
--

CREATE TABLE `offer_detail` (
  `offer_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `restaurant_id` int(11) NOT NULL DEFAULT 0,
  `image` varchar(150) NOT NULL DEFAULT '',
  `start_date` datetime NOT NULL DEFAULT current_timestamp(),
  `end_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 0 = inactive, 2 = delete',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `offer_detail`
--

INSERT INTO `offer_detail` (`offer_id`, `name`, `restaurant_id`, `image`, `start_date`, `end_date`, `status`, `create_date`, `update_date`) VALUES
(1, 'Offer1', 1, 'offer/20230703172053205368dAsJA5Uo.png', '2023-07-03 12:00:00', '2023-07-20 12:00:00', 1, '2023-07-03 17:19:49', '2023-07-03 17:24:57');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL DEFAULT 0,
  `delivery_address` varchar(500) NOT NULL DEFAULT '',
  `delivery_lat` varchar(50) NOT NULL DEFAULT '0.0',
  `delivery_long` varchar(50) NOT NULL DEFAULT '0.0',
  `deliver_note` varchar(3000) NOT NULL DEFAULT '',
  `sub_total` double NOT NULL DEFAULT 0,
  `delivery_cost` double NOT NULL DEFAULT 0,
  `payable_total` double NOT NULL DEFAULT 0,
  `order_status` int(2) NOT NULL DEFAULT 0 COMMENT '0=Pending Payment, 1 = order place, 2 = order ready, 3 = order out for delivery, 4 = deliverd, 5 = cancel, 6=refund',
  `transaction_id` varchar(50) NOT NULL DEFAULT '',
  `payment_method` int(1) NOT NULL DEFAULT 1 COMMENT '1 = cash on delivery, 2 = card payment, 3 = paypal',
  `payment_status` int(1) NOT NULL DEFAULT 0 COMMENT '0=waiting, 1 = success, 2 = fail, 3 = refund',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `portion_detail`
--

CREATE TABLE `portion_detail` (
  `portion_id` int(11) NOT NULL,
  `menu_item_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `addition_price` double NOT NULL DEFAULT 0,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1= active, 0 = inactive , 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portion_detail`
--

INSERT INTO `portion_detail` (`portion_id`, `menu_item_id`, `name`, `addition_price`, `create_date`, `update_date`, `status`) VALUES
(1, 1, 'small', 1, '2023-07-04 23:55:43', '2023-07-04 23:58:32', 2),
(2, 1, 'mid', 1, '2023-07-04 23:55:52', '2023-07-04 23:55:52', 1),
(3, 1, 'big', 1, '2023-07-04 23:55:57', '2023-07-04 23:55:57', 1);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_detail`
--

CREATE TABLE `restaurant_detail` (
  `restaurant_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `image` varchar(150) NOT NULL DEFAULT '',
  `shop_type` varchar(50) NOT NULL DEFAULT '',
  `food_type` varchar(150) NOT NULL DEFAULT '',
  `address` varchar(200) NOT NULL DEFAULT '',
  `city` varchar(50) NOT NULL DEFAULT '',
  `state` varchar(50) NOT NULL DEFAULT '',
  `latitude` double NOT NULL DEFAULT 0,
  `longitude` double NOT NULL DEFAULT 0,
  `delivery_cost` double NOT NULL DEFAULT 0,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = Active, 0 = inActive , 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurant_detail`
--

INSERT INTO `restaurant_detail` (`restaurant_id`, `name`, `image`, `shop_type`, `food_type`, `address`, `city`, `state`, `latitude`, `longitude`, `delivery_cost`, `create_date`, `update_date`, `status`) VALUES
(1, 'Minute by tuk tuk', 'restaurant/202307031648014818SMSnktIac.png', 'Cafa', 'Western Food', '3 Road ', 'Surat', 'Gujarat', 21.18097053697036, 72.83328257789638, 3, '2023-07-03 16:33:23', '2023-07-03 16:57:55', 1);

-- --------------------------------------------------------

--
-- Table structure for table `review_detail`
--

CREATE TABLE `review_detail` (
  `review_id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL DEFAULT 0,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `order_id` int(11) NOT NULL DEFAULT 0,
  `rate` int(11) NOT NULL DEFAULT 0,
  `message` varchar(2000) NOT NULL DEFAULT '',
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 2 = delete'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_detail`
--

CREATE TABLE `user_detail` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `mobile` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(500) NOT NULL DEFAULT '',
  `image` varchar(100) NOT NULL DEFAULT '',
  `device_type` varchar(10) NOT NULL DEFAULT 'I' COMMENT 'I = iOS, A = Android, W = Web',
  `user_type` int(1) NOT NULL DEFAULT 1 COMMENT '1 = User, 3 = Admin',
  `auth_token` varchar(100) NOT NULL DEFAULT '',
  `push_token` varchar(100) NOT NULL DEFAULT '',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `update_date` datetime NOT NULL DEFAULT current_timestamp(),
  `reset_code` varchar(10) NOT NULL DEFAULT '456789',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1 = active, 2 = deleted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_detail`
--

INSERT INTO `user_detail` (`user_id`, `name`, `email`, `password`, `mobile`, `address`, `image`, `device_type`, `user_type`, `auth_token`, `push_token`, `created_date`, `update_date`, `reset_code`, `status`) VALUES
(1, 'admin', 'admin@gmail.com', '123456', '', '', 'user/202307031754455445I3z9orwZwZ.png', 'I', 3, 'O7KQviEE8APVfpa5PVvX', '', '2023-06-23 12:04:48', '2023-07-03 17:54:45', '456789', 1),
(2, 'user1', 'testuser1@gmail.com', '123456', '9876543210', 'asd', '', 'I', 1, 'VtRUGUbl5BgD4QZaVmr4', '', '2023-06-27 10:35:06', '2023-07-03 17:53:24', '007855', 1),
(3, 'testuser2', 'testuser2@gmail.com', '1234567', '9876543210', 'Surat', '', 'I', 1, 'hvkIj2nNUnsGKW92VzIB', '', '2023-06-29 10:54:21', '2023-06-29 10:54:21', '653749', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about_detail`
--
ALTER TABLE `about_detail`
  ADD PRIMARY KEY (`about_id`);

--
-- Indexes for table `card_detail`
--
ALTER TABLE `card_detail`
  ADD PRIMARY KEY (`payment_method_id`);

--
-- Indexes for table `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `category_detail`
--
ALTER TABLE `category_detail`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `favorite_detail`
--
ALTER TABLE `favorite_detail`
  ADD PRIMARY KEY (`favorite_id`);

--
-- Indexes for table `inbox_detail`
--
ALTER TABLE `inbox_detail`
  ADD PRIMARY KEY (`inbox_id`);

--
-- Indexes for table `ingredient_detail`
--
ALTER TABLE `ingredient_detail`
  ADD PRIMARY KEY (`ingredient_id`);

--
-- Indexes for table `menu_detail`
--
ALTER TABLE `menu_detail`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `menu_item_detail`
--
ALTER TABLE `menu_item_detail`
  ADD PRIMARY KEY (`menu_item_id`);

--
-- Indexes for table `notification_detail`
--
ALTER TABLE `notification_detail`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `offer_detail`
--
ALTER TABLE `offer_detail`
  ADD PRIMARY KEY (`offer_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `portion_detail`
--
ALTER TABLE `portion_detail`
  ADD PRIMARY KEY (`portion_id`);

--
-- Indexes for table `restaurant_detail`
--
ALTER TABLE `restaurant_detail`
  ADD PRIMARY KEY (`restaurant_id`);

--
-- Indexes for table `review_detail`
--
ALTER TABLE `review_detail`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `user_detail`
--
ALTER TABLE `user_detail`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about_detail`
--
ALTER TABLE `about_detail`
  MODIFY `about_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `card_detail`
--
ALTER TABLE `card_detail`
  MODIFY `payment_method_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_detail`
--
ALTER TABLE `cart_detail`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category_detail`
--
ALTER TABLE `category_detail`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `favorite_detail`
--
ALTER TABLE `favorite_detail`
  MODIFY `favorite_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inbox_detail`
--
ALTER TABLE `inbox_detail`
  MODIFY `inbox_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredient_detail`
--
ALTER TABLE `ingredient_detail`
  MODIFY `ingredient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `menu_detail`
--
ALTER TABLE `menu_detail`
  MODIFY `menu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `menu_item_detail`
--
ALTER TABLE `menu_item_detail`
  MODIFY `menu_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notification_detail`
--
ALTER TABLE `notification_detail`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `offer_detail`
--
ALTER TABLE `offer_detail`
  MODIFY `offer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portion_detail`
--
ALTER TABLE `portion_detail`
  MODIFY `portion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `restaurant_detail`
--
ALTER TABLE `restaurant_detail`
  MODIFY `restaurant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `review_detail`
--
ALTER TABLE `review_detail`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_detail`
--
ALTER TABLE `user_detail`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
