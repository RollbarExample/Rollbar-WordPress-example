<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'rollbar');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '5dw/e`Z_Umm|qTelU.Pn^invve7St7?Xe;I9=G4f:qS_t;v,RKfEg=zYr^sgv; 7');
define('SECURE_AUTH_KEY',  'M2jFPd,I!h<3-@!@n3.q]I@=&kU6)kA(<insiR.HZiXfc;=OBe x!d$wpWaAYCq:');
define('LOGGED_IN_KEY',    'T7]fX>4 z2uW|@J 6lC5tZA6?YsdwYPo3u<,00P}Z{;&?KGQu&iL>[uxpGf$?Jgh');
define('NONCE_KEY',        'Ymn)UbvqY+~e@Ph]drya=pwOkHo#DBA1[6(G0, nT%:$~91rlQEheiQu91&3ksx+');
define('AUTH_SALT',        '&2??_&Gw;<woP4I JE}D^N`hI;B2RjH<+_+sH6J|KjC$u/Lh>H&^+awVbbjj0wpP');
define('SECURE_AUTH_SALT', 'sR[x&=pp}cp.KnOj?xj]H2=Y}_r0G=a^+ymOkf3d,{Y,m~jjt*Xo!DqW(T_<ciS%');
define('LOGGED_IN_SALT',   't9bRD5Msd:j>]*R<;sRgu?zF;$Hn4 {.IM$AWHNZo,&P$4>Oy48G&&w5%b:w!YSc');
define('NONCE_SALT',       '-;j8&<+i{YFx g&ajC(st7=9>i5;~*-yufp}}>cnZgJ(xp.|W1bck [];Ql^lLU1');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_rollbar';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
