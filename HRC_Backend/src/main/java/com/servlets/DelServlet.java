package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connection.DbConnection;

@WebServlet(urlPatterns = {"/DelServlet"}, name = "DelServlet")
public class DelServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public DelServlet() {
        super();
    }
    
	DbConnection connect = new DbConnection();
    
	public Integer DelData(Integer i)
	{
		try {
		 Connection conn = connect.getConnection();
		 String sql_query="UPDATE winter_internship SET is_deleted=1 WHERE sl_no=?";
		 PreparedStatement pst = conn.prepareStatement(sql_query);
		 
				pst.setInt(1, i);
				
				pst.executeUpdate();
				System.out.println("Data Deleted...");				
				
		 }
		 catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occur at Deletion query");
		 }
		return 1;
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
          
        int value = Integer.parseInt(request.getParameter("sl_no"));      
          
        int status=DelData(value);  
        
        if(status>0){ 
        	System.out.println("Deletion Performed");         
        }else{  
            System.out.println("Sorry! unable to delete record");  
        }   
	}
}


