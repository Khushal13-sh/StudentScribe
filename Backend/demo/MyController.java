package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class MyController {

	@Autowired
	StudentRepo studentRepo;
	@Autowired
	UserRepo userRepo;
	
	@RequestMapping("login{username}")
	public int login(@PathVariable String username, @RequestBody String password) {
		
		int cnt=userRepo.countByUsername(username);
		
		if(cnt==0)
			return 2;//wrong username
		else if (cnt>1)
			return 3;// multiple account with same username
		else {
			User user=userRepo.findByUsername(username);
			
			if(user.password.equals(password))
				return 1;//login
			else 
				return 4;//password wrong
		}
	}
	
	@RequestMapping("save")
	public Student save(@RequestBody Student student) {
		try {
			Student studentD= studentRepo.save(student);
			return  studentD;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@RequestMapping("delete{id}")
	public int delete(@PathVariable int id) {
		try {
			studentRepo.deleteById(id);
			return 1;  //if done
		} catch (Exception e) {
			e.printStackTrace();
			return 0;  //if exception on server
		}
	}
	
	@RequestMapping("get")
	public List<Student> get(){
		try {
			return studentRepo.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
