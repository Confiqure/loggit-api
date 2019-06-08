ALTER TABLE `users` RENAME TO `user`, DROP COLUMN `token`, CHANGE COLUMN `hash` `password` VARCHAR(60) NOT NULL, CHANGE COLUMN `school` `school_id` INT(11) UNSIGNED NOT NULL, ADD UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE, CHANGE COLUMN `role` `role_id` INT(11) UNSIGNED NOT NULL DEFAULT '2', ADD COLUMN `sau_id` SMALLINT(3) UNSIGNED NOT NULL AFTER `password`, CHANGE COLUMN `id` `staff_id` TEXT NOT NULL, DROP PRIMARY KEY, ADD COLUMN `id` INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL FIRST, ADD UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE;
UPDATE `user` SET `sau_id` = 67;

CREATE TABLE `role` (
  `id` INT(11) UNSIGNED NOT NULL,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
);
INSERT INTO `role` (`id`, `name`) VALUES (1, 'Paraprofessional'), (2, 'Faculty Member'), (3, 'Department Coordinator'), (4, 'Building Business Manager'), (5, 'Building Substitute Coordinator'), (6, 'Building PD Representative'), (7, 'Building Admin'), (8, 'SAU Business Manager'), (9, 'Master');

ALTER TABLE `schools` RENAME TO `school`, ADD UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE, CHANGE COLUMN `id` `id` INT(11) UNSIGNED NOT NULL;
UPDATE `school` SET `id` = '0' WHERE (`id` = '5');

ALTER TABLE `certs` RENAME TO `certification`, ADD UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE, CHANGE COLUMN `notes` `notes` TEXT NOT NULL;
ALTER TABLE `users_certs` RENAME TO `usercert`;
ALTER TABLE `goals` RENAME TO `goal`, CHANGE COLUMN `type` `type` VARCHAR(4) NOT NULL;
ALTER TABLE `activities` RENAME TO `activity`, CHANGE COLUMN `year` `year` SMALLINT(4) UNSIGNED NOT NULL, CHANGE COLUMN `state` `state` TINYINT(4) UNSIGNED NOT NULL DEFAULT '0', CHANGE COLUMN `type` `type_id` INT(11) NOT NULL DEFAULT '-1';
ALTER TABLE `activity_types` RENAME TO `activitytype`, ADD UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE;
ALTER TABLE `credits` RENAME TO `credit`, CHANGE COLUMN `credits` `amount` DECIMAL(5,2) UNSIGNED NOT NULL;
ALTER TABLE `expenses` RENAME TO `expense`, CHANGE COLUMN `state` `state` TINYINT(4) NOT NULL DEFAULT '0';

CREATE TABLE `activitylink` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `parent_id` int(11) UNSIGNED NOT NULL,
  `location` text NOT NULL,
  PRIMARY KEY (`id`));
INSERT INTO `activitylink` SELECT DISTINCT `id`, `name`, `parent`, `location` FROM `links` WHERE `type` = 'activity';
CREATE TABLE `goallink` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `parent_id` int(11) UNSIGNED NOT NULL,
  `location` text NOT NULL,
  PRIMARY KEY (`id`));
INSERT INTO `goallink` SELECT DISTINCT `id`, `name`, `parent`, `location` FROM `links` WHERE `type` = 'goal';
DROP TABLE `links`;

UPDATE `activity` INNER JOIN `user` ON `user`.`username` = `activity`.`username` SET `activity`.`username` = `user`.`id`;
ALTER TABLE `activity` CHANGE COLUMN `username` `user_id` INT(11) UNSIGNED NOT NULL;
UPDATE `goal` INNER JOIN `user` ON `user`.`username` = `goal`.`username` SET `goal`.`username` = `user`.`id`;
ALTER TABLE `goal` CHANGE COLUMN `username` `user_id` INT(11) UNSIGNED NOT NULL;
UPDATE `usercert` INNER JOIN `user` ON `user`.`username` = `usercert`.`username` SET `usercert`.`username` = `user`.`id`;
ALTER TABLE `usercert` CHANGE COLUMN `username` `user_id` INT(11) UNSIGNED NOT NULL;

CREATE TABLE `sau` (
  `id` SMALLINT(3) UNSIGNED NOT NULL,
  `activity_types_enabled` BIT(1) NOT NULL,
  `credit_label` VARCHAR(8) NOT NULL,
  `expenses_enabled` BIT(1) NOT NULL,
  `goal_enabled` BIT(1) NOT NULL,
  `resources` TEXT NOT NULL,
  `seat_limit` SMALLINT(4) UNSIGNED NOT NULL,
  `text_final` VARCHAR(32) NOT NULL,
  `text_final_instructions` TEXT NOT NULL,
  `text_pre` VARCHAR(32) NOT NULL,
  `text_pre_instructions` TEXT NOT NULL,
  `text_required` BIT(1) NOT NULL,
  `two_step_final_approval` BIT(1) NOT NULL,
  `whitelist_emails` TEXT NOT NULL,
  PRIMARY KEY (`id`));
INSERT INTO `sau` (`id`,`activity_types_enabled`,`expenses_enabled`,`credit_label`,`text_final`,`text_final_instructions`,`text_pre`,`text_pre_instructions`,`text_required`,`goal_enabled`,`resources`,`seat_limit`,`two_step_final_approval`,`whitelist_emails`) VALUES (67,b'1',b'0','Hours','Reflection','<strong>Guiding Questions:</strong><ul><li>What did you do?</li><li>What new skills and/or knowledge did you gain by participating in this activity? How will this activity impact your teaching practice in the classroom?</li><li>What evidence/data will you gather to show how your learning from this activity will impact student learning?</li><li>What are your next steps?</li></ul>','Additional Information','<strong>Guiding Questions:</strong><ul><li>What did you do?</li><li>What new skills and/or knowledge did you gain by participating in this activity? How will this activity impact your teaching practice in the classroom?</li><li>What evidence/data will you gather to show how your learning from this activity will impact student learning?</li><li>What are your next steps?</li></ul>',b'0',b'0','<div class=\"row\">\n	<div class=\"col-md-12\">\n		<p>\n			This page serves as an introduction to and a resource space for PD in SAU 67. Loggit is our new PD logging app and is open to all those starting their new cycle of PD after the 2016-17 school year.\n		</p>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-md-3\">\n		<div class=\"panel panel-primary\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title\"><i class=\"fa fa-files-o fa-fw\"></i> Documents</h3>\n			</div>\n			<div class=\"panel-body\">\n				<p><a href=\"http://trm.ph/9KN3\" target=\"_blank\">Goal Approval Form</a></p>\n				<p><a href=\"http://trm.ph/5TDZ\" target=\"_blank\">Professional Development Log</a></p>\n				<p><a href=\"http://trm.ph/Awuf\" target=\"_blank\">Reflection Sheet</a></p>\n				<p><a href=\"http://trm.ph/Vlel\" target=\"_blank\">Professional Learning Plan Master Document (Full Version)</a></p>\n			</div>\n		</div>\n		<div class=\"panel panel-primary\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title\"><i class=\"fa fa-pencil fa-fw\"></i> Survey: PD</h3>\n			</div>\n			<div class=\"panel-body\">\n				<p><a href=\"http://trm.ph/a0OA\" target=\"_blank\">Survey 2016-2017 Link</a></p>\n				<p>Self assessment survey. Data used as part of our Title IIa grant.</p>\n				<p>No identifying information is collected or reported.</p>\n			</div>\n		</div>\n		<div class=\"panel panel-primary\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title\"><i class=\"fa fa-question-circle fa-fw\"></i> Contact Don Gage with Questions</h3>\n			</div>\n			<div class=\"panel-body\">\n				<div class=\"text-center\">\n					<p><i class=\"fa fa-envelope fa-fw\"></i> <a href=\"mailto:dgage@bownet.org\">Email</a></p>\n					<p><i class=\"fa fa-globe fa-fw\"></i> <a href=\"http://trm.ph/rt2b\" target=\"_blank\">Website</a></p>\n					<p><i class=\"fa fa-youtube fa-fw\"></i> <a href=\"http://trm.ph/vaNK\" target=\"_blank\">YouTube</a></p>\n				</div>\n			</div>\n		</div>\n	</div>\n	<div class=\"col-md-9\">\n		<div class=\"panel panel-primary\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title\"><i class=\"fa fa-search fa-fw\"></i> SAU 67 Professional Development Overview</h3>\n			</div>\n			<div class=\"panel-body text-center\">\n				<iframe src=\"https://drive.google.com/a/bownet.org/file/d/0B-aqOhPrDFkrQ3Z5bzRhMHMyS0E/preview\" width=\"480\" height=\"360\"></iframe>\n			</div>\n		</div>\n		<div class=\"panel panel-primary\">\n			<div class=\"panel-heading\">\n				<h3 class=\"panel-title\"><i class=\"fa fa-file-powerpoint-o fa-fw\"></i> New Teacher PowerPoint 2016</h3>\n			</div>\n			<div class=\"panel-body\">\n				<p><a href=\"http://trm.ph/ZGzJ\" target=\"_blank\">PowerPoint on LibGuides</a></p>\n			</div>\n		</div>\n	</div>\n</div>\n<div class=\"row\">\n	<div class=\"col-md-12\">\n		<p><strong>Last Updated:</strong> Jul 2, 2017 12:00 PM&nbsp;&nbsp;|&nbsp;&nbsp;<strong>Content Originally From:</strong> <a href=\"http://trm.ph/NAE2\" target=\"_blank\">http://bownet.libguides.com/c.php?g=554314</a></p>\n	</div>\n</div>',215,b'0','@bownet.org;@desnet.org;@dunbarton.k12.nh.us');
INSERT INTO `sau` (`id`,`activity_types_enabled`,`expenses_enabled`,`credit_label`,`text_final`,`text_final_instructions`,`text_pre`,`text_pre_instructions`,`text_required`,`goal_enabled`,`resources`,`seat_limit`,`two_step_final_approval`,`whitelist_emails`) VALUES (24,b'1',b'0','Hours','Reflection','As you reflect on your learning from this activity, share how what you learned will reinforce or enhance your practice. <strong>Consider one or more of the following areas in your reflection:</strong><ul><li>Review and revision of curriculum</li><li>Assessment of student performance</li><li>Analysis of results to inform curriculum and instruction</li><li>Development and refinement of instructional strategies</li><li>Potential impact of ideas and processes on student learning</li><li>Impact on your perspective/thinking</li><li>Connection to professional development and the goals of the school community</li></ul>How will you follow up this professional development experience? What support and resources will you need?','Additional Information','Explain the activity you\'re proposing. Make sure to include the date and location in the boxes above. By whom is this activity sponsored? Explain how it links to: school goals? strategic plan? content endorsement? three-year IPDP? How it will improve professional practice and student learning? <b>Be specific.</b>',b'0',b'0','<div class=\"panel panel-red\">\n	<div class=\"panel-heading\">\n		<h3 class=\"panel-title\"><i class=\"fa fa-star fa-fw\"></i> 2017 School Goal</h3>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"row\">\n			<div class=\"col-md-12\">\n				<p>\n					This is the school goal in full detail for the 2017 school year as a quick reference.\n				</p>\n			</div>\n		</div>\n	</div>\n</div>\n<div class=\"panel panel-info\">\n	<div class=\"panel-heading\">\n		<h3 class=\"panel-title\"><i class=\"fa fa-globe fa-fw\"></i> Useful Links</h3>\n	</div>\n	<div class=\"panel-body\">\n		<div class=\"list-group\">\n			<a class=\"list-group-item\" href=\"http://trm.ph/dfhU\" target=\"_blank\">\n				<span class=\"pull-left\">Loggit Manual</span>\n				<span class=\"pull-right\"><i class=\"fa fa-arrow-circle-right text-info\"></i></span>\n				<div class=\"clearfix\"></div>\n			</a>\n			<a class=\"list-group-item\" href=\"https://loggit.org/\" target=\"_blank\">\n				<span class=\"pull-left\">Staff Portal (coming soon)</span>\n				<span class=\"pull-right\"><i class=\"fa fa-arrow-circle-right text-info\"></i></span>\n				<div class=\"clearfix\"></div>\n			</a>\n			<a class=\"list-group-item\" href=\"https://jsrhs-sau24.libguides.com/ProfDevt\" target=\"_blank\">\n				<span class=\"pull-left\">JSRHS Professional Development on LibGuides</span>\n				<span class=\"pull-right\"><i class=\"fa fa-arrow-circle-right text-info\"></i></span>\n				<div class=\"clearfix\"></div>\n			</a>\n			<a class=\"list-group-item\" href=\"https://loggit.org/\" target=\"_blank\">\n				<span class=\"pull-left\">Other Schools Professional Development on LibGuides (coming soon)</span>\n				<span class=\"pull-right\"><i class=\"fa fa-arrow-circle-right text-info\"></i></span>\n				<div class=\"clearfix\"></div>\n			</a>\n		</div>\n	</div>\n</div>',215,b'0','@sau24.org');

CREATE TABLE `saurole` (
  `sau_id` SMALLINT(3) UNSIGNED NOT NULL,
  `role_id` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`sau_id`, `role_id`));

INSERT INTO `saurole` (`sau_id`, `role_id`) VALUES ('24', '1'), ('24', '2'), ('24', '3'), ('24', '4'), ('24', '5'), ('24', '6'), ('24', '7'), ('24', '8'), ('24', '9');
INSERT INTO `saurole` (`sau_id`, `role_id`) VALUES ('67', '1'), ('67', '2'), ('67', '7'), ('67', '8'), ('67', '9');

ALTER TABLE `school` ADD COLUMN `sau_id` SMALLINT(3) UNSIGNED NOT NULL AFTER `id`;
