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
import com.pojo.InvoicePojo; 

@WebServlet(urlPatterns = {"/EditServlet"}, name = "EditServlet")
public class EditServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public EditServlet() {
        super();
    }

DbConnection connect = new DbConnection();
	
	public Integer UpdateData(InvoicePojo i)
	{
		try {
			
			Connection conn = connect.getConnection();
		 
			if(i.getInvoice_currency()=="" && i.getCust_payment_terms()=="")
			{
				System.out.println("Nothing updated");
			}
			else if(i.getCust_payment_terms()=="")
			{
				String sql_query="UPDATE winter_internship SET invoice_currency=? WHERE sl_no=?";
				PreparedStatement pst = conn.prepareStatement(sql_query);
		 
					pst.setString(1, i.getInvoice_currency());
					pst.setInt(2, i.getSl_no());
				
					pst.executeUpdate();
					System.out.println("Data Updated For invoice_currency...");
			}
			else if(i.getInvoice_currency()=="")
			{
				String sql_query="UPDATE winter_internship SET cust_payment_terms=? WHERE sl_no=?";
				PreparedStatement pst = conn.prepareStatement(sql_query);
		 
					pst.setString(1, i.getCust_payment_terms());
					pst.setInt(2, i.getSl_no());
				
					pst.executeUpdate();
					System.out.println("Data Updated For cust_payment_terms...");
			}
			else
			{
				String sql_query="UPDATE winter_internship SET cust_payment_terms=?,invoice_currency=? WHERE sl_no=?";
				PreparedStatement pst = conn.prepareStatement(sql_query);
		 
					pst.setString(1, i.getCust_payment_terms());
					pst.setString(2, i.getInvoice_currency());
					pst.setInt(3, i.getSl_no());
				
					pst.executeUpdate();
					System.out.println("Data Updated For Both Inputs...");				
			}
		}
		catch (Exception e) {
			e.printStackTrace();
			System.out.println("exception occur at Updation query");
		}
		return 1;
	}
	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
          
        InvoicePojo e = new InvoicePojo();   
        e.setCust_payment_terms(request.getParameter("cust_payment_terms"));  
        e.setInvoice_currency(request.getParameter("invoice_currency")); 
        e.setSl_no(Integer.parseInt(request.getParameter("sl_no")));
          
        int status=UpdateData(e);  
        if(status>0){ 
        	System.out.println("Updation perfomed");         
        }else{  
            System.out.println("Sorry! unable to edit record");  
        }   
    }  
}

