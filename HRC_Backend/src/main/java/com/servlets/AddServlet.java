package com.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.queries.Insert;
import com.pojo.InvoicePojo; 

@WebServlet(urlPatterns = {"/AddServlet"}, name = "AddServlet")
public class AddServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public AddServlet() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException { 
          
        InvoicePojo i = new InvoicePojo();  

		i.setBusiness_code(request.getParameter("buisness_code"));
		i.setCust_number(Integer.parseInt( request.getParameter("cust_number")));
		i.setClear_date(request.getParameter("clear_date"));
		i.setBuisness_year(request.getParameter("buisness_year"));
		i.setDoc_id(request.getParameter("doc_id"));
		i.setPosting_date(request.getParameter("posting_date"));
		i.setDocument_create_date(request.getParameter("document_create_date"));
		i.setDue_in_date(request.getParameter("due_in_date"));
		i.setInvoice_currency(request.getParameter("invoice_currency"));
		i.setDocument_type(request.getParameter("document_type"));
		i.setPosting_id(Integer.parseInt( request.getParameter("posting_id")));
		i.setTotal_open_amount(Double.parseDouble(request.getParameter("total_open_amount")));
		i.setBaseline_create_date(request.getParameter("baseline_create_date"));
		i.setCust_payment_terms(request.getParameter("cust_payment_terms"));
		i.setInvoice_id(Integer.parseInt( request.getParameter("invoice_id")));
        
        System.out.println(i);
          
        Insert adddata = new Insert();
        int status=adddata.InsertData(i);  
        
        if(status>0){ 
        	System.out.println("Data Added");         
        }else{  
            System.out.println("Sorry! unable to save record");  
        }   
    }  
}

