package com.servlets;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.connection.DbConnection;
import com.google.gson.Gson;

@WebServlet(urlPatterns = {"/RowCountServlet"}, name = "RowCountServlet")
public class RowCountServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;	
  
    public RowCountServlet() {
        super();
    }
    
    public int count = 0;  
    DbConnection connect = new DbConnection();
	
	public int countData(String BY, String CN, String ID, String DD)
	{	
		try {
			Connection conn = connect.getConnection();
			String query = "SELECT COUNT(*) AS count FROM winter_internship WHERE is_deleted=0 AND cust_number LIKE ? AND buisness_year LIKE ? AND doc_id LIKE ? AND invoice_id LIKE ? ";
			PreparedStatement pst = conn.prepareStatement(query);
			
			String cust_number = CN + "%";
			String buisness_year = BY + "%";
			String doc_id = DD + "%";
			String invoice_id = ID + "%";
			
			pst.setString(1, cust_number);
			pst.setString(2, buisness_year);
			pst.setString(3, doc_id);
			pst.setString(4, invoice_id);
			
			ResultSet rs = pst.executeQuery();
			rs.next();
			count = rs.getInt("count");
		
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("Exception occured at Count Query");
		}
		return count;
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
        String BY = request.getParameter("buisness_year");
        String CN;
        if(request.getParameter("cust_numberById")=="")
        	{ CN = request.getParameter("cust_number");}
        else
        	{ CN = request.getParameter("cust_numberById");}  
        String ID = request.getParameter("invoice_id"); 
        String DD = request.getParameter("doc_id");
        
		Integer data = countData(BY, CN, ID, DD);
	
		Gson gson = new Gson();
		String respData = gson.toJson(data);
		response.getWriter().print(respData);
	}
}

