export interface ItemData {
  id?: number;
  name?: string;
  group?: string;
  level?: number;
  count?: number;
  time?: string;
  description?: string;
}

export interface IHostQueryConditions {
  pageIndex?: number;
  pageSize?: number;
  id?: string;
}

const a = `"	Nginx error message.	"	|	3	|	1,027,930
"	Host-based anomaly detection event (rootcheck).	"	|	7	|	781,847
"	Systemd: Service has entered a failed state, and likely has not started.	"	|	5	|	208,257
"	Systemd: Service exited due to a failure.	"	|	5	|	208,246
"	Web server 400 error code.	"	|	5	|	96,204
"	Web server 500 error code (server error).	"	|	5	|	37,101
"	Integrity checksum changed.	"	|	7	|	25,015
"	Web server 503 error code (Service unavailable).	"	|	4	|	22,381
"	Listened ports status (netstat) changed (new port opened or closed).	"	|	7	|	8,234
"	PAM: Login session opened.	"	|	3	|	4,195
"	Windows Logon Success	"	|	3	|	4,159
"	PAM: Login session closed.	"	|	3	|	3,855
"	A web attack returned code 200 (success).	"	|	6	|	2,879
"	SQL injection attempt.	"	|	6	|	2,502
"	File added to the system.	"	|	5	|	2,342
"	sshd: authentication success.	"	|	3	|	2,092
"	Interface entered in promiscuous(sniffing) mode.	"	|	8	|	1,368
"	Web server 500 error code (Internal Error).	"	|	5	|	1,354
"	PHP Warning message.	"	|	3	|	1,257
"	rsyslog may be dropping messages due to rate-limiting.	"	|	4	|	1,047
"	Dpkg (Debian Package) half configured.	"	|	7	|	802
"	Log file rotated.	"	|	3	|	794
"	Software Protection service scheduled successfully	"	|	3	|	671
"	New dpkg (Debian Package) installed.	"	|	7	|	602
"	Multiple web server 503 error code (Service unavailable).	"	|	10	|	421
"	Host Blocked by firewall-drop.sh Active Response	"	|	3	|	374
"	Host Unblocked by firewall-drop.sh Active Response	"	|	3	|	372
"	Apache: Attempt to access forbidden directory index.	"	|	5	|	322
"	Multiple SQL injection attempts from same source ip.	"	|	10	|	313
"	File deleted.	"	|	7	|	221
"	Multiple web server 400 error codes from same source ip.	"	|	10	|	219
"	New dpkg (Debian Package) requested to install.	"	|	3	|	156
"	Successful sudo to ROOT executed.	"	|	3	|	129
"	Nginx critical message.	"	|	5	|	115
"	Windows User Logoff	"	|	3	|	115
"	Dpkg (Debian Package) removed.	"	|	7	|	93
"	Ossec agent disconnected.	"	|	3	|	91
"	Ossec agent started.	"	|	3	|	82
"	Query cache denied (probably config error).	"	|	5	|	82
"	High amount of POST requests in a small period of time (likely bot).	"	|	10	|	73
"	Windows Application error event	"	|	9	|	58
"	Agent event queue is full. Events may be lost.	"	|	9	|	54
"	Common web attack.	"	|	6	|	48
"	Agent event queue is 90% full.	"	|	7	|	39
"	Agent event queue is back to normal load.	"	|	3	|	39
"	PHPMyAdmin scans (looking for setup.php).	"	|	6	|	38
"	User successfully changed UID to root.	"	|	3	|	38
"	syslog: User authentication failure.	"	|	5	|	17
"	Multiple web server 500 error code (Internal Error).	"	|	10	|	16
"	sshd: Attempt to login using a non-existent user	"	|	5	|	16
"	System time changed	"	|	5	|	15
"	Suspicious URL access.	"	|	6	|	14
"	Systemd: System time has been changed.	"	|	5	|	14
"	Windows System error event	"	|	5	|	14
"	Desktop Window Manager exited with code 0xd00002fe	"	|	5	|	13
"	Windows Workstation Logon Success	"	|	3	|	12
"	Service startup type was changed	"	|	3	|	10
"	CIS benchmark for Debian/Linux 9 L2: Disable Automounting	"	|	3	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure CUPS is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure CUPS is not enabled	"	|	7	|	2
"	CIS benchmark for Debian/Linux 9 L2: Ensure SELinux or AppArmor are installed	"	|	3	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure audit log storage size is configured	"	|	3	|	5
"	CIS benchmark for Debian/Linux 9 L2: Ensure audit log storage size is configured	"	|	7	|	4
"	CIS benchmark for Debian/Linux 9 L2: Ensure audit logs are not automatically deleted	"	|	7	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure auditd service is enabled	"	|	3	|	5
"	CIS benchmark for Debian/Linux 9 L2: Ensure auditd service is enabled	"	|	7	|	4
"	CIS benchmark for Debian/Linux 9 L2: Ensure auditing for processes that start prior to auditd is enabled	"	|	7	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure separate partition exists for /home	"	|	7	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure separate partition exists for /var	"	|	7	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure separate partition exists for /var/log	"	|	7	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure separate partition exists for /var/log/audit	"	|	7	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure separate partition exists for /var/tmp	"	|	7	|	9
"	CIS benchmark for Debian/Linux 9 L2: Ensure system is disabled when audit logs are full	"	|	7	|	9
"	First time user executed sudo.	"	|	4	|	9
"	Blacklisted user agent (known malicious user agent).	"	|	6	|	8
"	CIS benchmark for Debian/Linux 9 L2: Ensure events that modify date and time information are collected	"	|	7	|	8
"	CIS benchmark for Debian/Linux 9 L2: Ensure events that modify the system's network environment are collected	"	|	7	|	8
"	CIS benchmark for Debian/Linux 9 L2: Ensure events that modify user/group information are collected	"	|	7	|	8
"	PAM: User login failed.	"	|	5	|	8
"	SCA summary: CIS benchmark for Debian/Linux 9 L1: Score less than 50% (36)	"	|	7	|	8
"	The database engine has completed recovery steps	"	|	3	|	8
"	The database engine is initiating recovery steps	"	|	3	|	8
"	The database engine is replaying log file C:\Winnt\system32\wins\j50.log	"	|	3	|	8
"	The database engine is starting a new instance	"	|	3	|	8
"	CIS benchmark for Debian/Linux 9 L1: Disable Automounting	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure /etc/hosts.allow is configured	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure /etc/hosts.deny is configured	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure /tmp is configured	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure AIDE is installed	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure Avahi Server is not enabled	"	|	3	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure Avahi Server is not enabled	"	|	7	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure CUPS is not enabled	"	|	3	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure CUPS is not enabled	"	|	7	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure DCCP is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure DHCP Server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure DNS Server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure FTP Server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure GDM login banner is configured	"	|	3	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure GDM login banner is configured	"	|	7	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure HTTP Proxy Server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure HTTP Server is not enabled	"	|	3	|	6
"	CIS benchmark for Debian/Linux 9 L1: Ensure HTTP Server is not enabled	"	|	7	|	1
"	CIS benchmark for Debian/Linux 9 L1: Ensure ICMP redirects are not accepted	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure IMAP and POP3 server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure IP forwarding is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure IPv6 default deny firewall policy	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure IPv6 router advertisements are not accepted	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure LDAP server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure NFS and RPC are not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure NIS Client is not installed	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure NIS Server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure RDS is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure Reverse Path Filtering is enabled	"	|	3	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure Reverse Path Filtering is enabled	"	|	7	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SCTP is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure SNMP Server is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH HostbasedAuthentication is disabled	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH HostbasedAuthentication is disabled	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH Idle Timeout Interval is configured	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH Idle Timeout Interval is configured	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH IgnoreRhosts is enabled	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH IgnoreRhosts is enabled	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH LogLevel is appropriate	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH LogLevel is appropriate	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH MaxAuthTries is set to 4 or less	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH MaxAuthTries is set to 4 or less	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH PermitEmptyPasswords is disabled	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH PermitEmptyPasswords is disabled	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH PermitUserEnvironment is disabled	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH PermitUserEnvironment is disabled	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH Protocol is set to 2	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH Protocol is set to 2	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH X11 forwarding is disabled	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH X11 forwarding is disabled	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH access is limited	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH access is limited	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH root login is disabled	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH root login is disabled	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH warning banner is configured	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure SSH warning banner is configured	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure Samba is not enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure TCP SYN Cookies is enabled	"	|	3	|	5
"	CIS benchmark for Debian/Linux 9 L1: Ensure TCP SYN Cookies is enabled	"	|	7	|	2
"	CIS benchmark for Debian/Linux 9 L1: Ensure TIPC is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure access to the su command is restricted	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure address space layout randomization (ASLR) is enabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure at/cron is restricted to authorized users	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure authentication required for single user mode	"	|	7	|	6
"	CIS benchmark for Debian/Linux 9 L1: Ensure authentication required for single user mode	"	|	3	|	1
"	CIS benchmark for Debian/Linux 9 L1: Ensure bogus ICMP responses are ignored	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure bootloader password is set	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure broadcast ICMP requests are ignored	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure chrony is configured	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure core dumps are restricted	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure cron daemon is enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure default deny firewall policy	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure default group for the root account is GID 0	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure filesystem integrity is regularly checked	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure inactive password lock is 30 days or less	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure iptables is installed	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure local login warning banner is configured properly	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure lockout for failed password attempts is configured	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure minimum days between password changes is 7 or more	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure mounting of freevxfs filesystems is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure mounting of hfs filesystems is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure mounting of hfsplus filesystems is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure mounting of jffs2 filesystems is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure mounting of udf filesystems is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure no legacy "+" entries exist in /etc/group	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure no legacy "+" entries exist in /etc/passwd	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure no legacy "+" entries exist in /etc/shadow	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure nodev option set on /dev/shm partition	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure nodev option set on /home partition	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure nodev option set on /tmp partition	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure nodev option set on /var/tmp partition	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure noexec option set on /dev/shm partition	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure noexec option set on /var/tmp partition	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure nosuid option set on /dev/shm partition	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure nosuid option set on /tmp partition	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure nosuid option set on /var/tmp partition	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure ntp is configured	"	|	3	|	6
"	CIS benchmark for Debian/Linux 9 L1: Ensure ntp is configured	"	|	7	|	1
"	CIS benchmark for Debian/Linux 9 L1: Ensure openbsd-inetd is not installed	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure packet redirect sending is disabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure password creation requirements are configured	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure password expiration is 365 days or less	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure password expiration warning days is 7 or more	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure password fields are not empty	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure password reuse is limited	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure permissions on /etc/ssh/sshd_config are configured	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure remote rsyslog messages are only accepted on designated log hosts	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure root is the only UID 0 account	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure rsh client is not installed	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure rsync service is not enabled	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure rsyslog Service is enabled	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure rsyslog is configured to send logs to a remote log host	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure secure ICMP redirects are not accepted	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure shadow group is empty	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure source routed packets are not accepted	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure suspicious packets are logged	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure talk client is not installed	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure telnet client is not installed	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L1: Ensure xinetd is not installed	"	|	3	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure SSH X11 forwarding is disabled	"	|	7	|	5
"	CIS benchmark for Debian/Linux 9 L2: Ensure SSH X11 forwarding is disabled	"	|	3	|	2
"	CIS benchmark for Debian/Linux 9 L2: Ensure discretionary access control permission modification events are collected	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure events that modify the system's Mandatory Access Controls are collected (AppArmor)	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure events that modify the system's Mandatory Access Controls are collected (SELinux)	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure file deletion events by users are collected	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure kernel module loading and unloading is collected	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure login and logout events are collected	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure session initiation information is collected	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure successful file system mounts are collected	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure system administrator actions (sudolog) are collected	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure the audit configuration is immutable	"	|	7	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure unsuccessful unauthorized file access attempts are collected	"	|	7	|	7
"	The database engine attached a database	"	|	3	|	7
"	sshd: Possible attack on the ssh server (or version gathering).	"	|	8	|	7
"	CIS benchmark for Debian/Linux 9 L2: Ensure changes to system administration scope (sudoers) is collected	"	|	7	|	6
"	SLUI.exe launched	"	|	3	|	6
"	WSearch was unavailable to handle a notification event	"	|	5	|	6
"	sshd: authentication failed.	"	|	5	|	6
"	SCA summary: CIS benchmark for Debian/Linux 9 L2: Score less than 30% (10)	"	|	9	|	4
"	sshd: Attempt to login using a denied user.	"	|	5	|	4
"	First time (su) is executed by user.	"	|	4	|	3
"	SCA summary: CIS benchmark for Debian/Linux 9 L2: Score less than 30% (17)	"	|	9	|	3
"	The VSS service is shutting down due to idle timeout	"	|	5	|	3
"	Apache: Invalid URI (bad client request).	"	|	5	|	2
"	Logon Failure - Unknown user or bad password	"	|	5	|	2
"	New ossec agent connected.	"	|	3	|	2
"	Nginx warning message.	"	|	3	|	2
"	Summary event of the report's signatures	"	|	4	|	2
"	User missed the password to change UID (user id).	"	|	5	|	2
"	User successfully changed UID.	"	|	3	|	2
"	sshd: insecure connection attempt (scan).	"	|	6	|	2
"	syslog: User missed the password more than one time.	"	|	10	|	2
"	unix_chkpwd: Password check failed.	"	|	5	|	2
"	Multiple System error events	"	|	10	|	1
"	New group added to the system.	"	|	8	|	1
"	New user added to the system.	"	|	8	|	1
"	Ossec server started.	"	|	3	|	1
"	SCA summary: CIS benchmark for Debian/Linux 9 L1: Score less than 50% (35)	"	|	7	|	1
"	SCA summary: CIS benchmark for Debian/Linux 9 L1: Score less than 50% (37)	"	|	7	|	1
"	SCA summary: CIS benchmark for Debian/Linux 9 L2: Score less than 30% (7)	"	|	9	|	1
"	Syslogd exiting (logging stopped).	"	|	5	|	1
"	System user successfully logged to the system.	"	|	12	|	1
`;

const csvJSON = csv => {
  const lines = csv.split("\n");
  const result = [];

  for (let i = 0; i < lines.length; i += 1) {
    const obj: any = {};
    const currentline = lines[i].split("|");
    if (currentline[0] !== "" && i < 1000) {
      obj.id = i;
      obj.name = currentline[0]; //.replace(/\"/gi, "");
      obj.level = currentline[1];
      obj.count = currentline[2];
      result.push(obj);
    } else break;
  }

  return result;
  // JSON
};

export const initialEventsState: ItemData[] = csvJSON(a);

export interface IState {
  count: number;
  items: ItemData[];
  item: ItemData;
}

export const initialState: IState = {
  items: initialEventsState,
  count: initialEventsState.length,
  item: initialEventsState[0]
};
