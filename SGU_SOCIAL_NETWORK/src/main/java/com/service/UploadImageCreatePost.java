package com.service;

import java.io.File;
import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

@WebServlet({ "/create_post/upload" })
public class UploadImageCreatePost extends HttpServlet {
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		File dir = new File(req.getServletContext().getRealPath("../assets/images"));
		if (!dir.exists())
			dir.mkdirs();
		Part photo = req.getPart("create_post_photo_file");
		File photoFile = new File(dir, photo.getSubmittedFileName());
		photo.write(photoFile.getAbsolutePath());
		req.setAttribute("img", photoFile);

		req.getRequestDispatcher("../component/Post.jsp").forward(req, resp);

	}

}
