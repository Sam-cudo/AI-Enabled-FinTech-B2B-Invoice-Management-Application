package com.connection;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {
	
	// Establishing connection
	public Connection getConnection()
	{
		Connection conn =null;
		String url ="jdbc:mysql://localhost:3306/";
		String Db = "grey_goose";
		String user = "root";
		String pass ="root";
					
		try{
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(url + Db,user,pass);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		}		
		return conn;
	}
}
